#!/usr/bin/env python3

import json
import tqdm
import implicit
import numpy as np
import scipy.sparse as sparse
from implicit.als import AlternatingLeastSquares
from implicit.approximate_als import (AnnoyAlternatingLeastSquares, FaissAlternatingLeastSquares,
                                      NMSLibAlternatingLeastSquares)
from implicit.bpr import BayesianPersonalizedRanking
from implicit.datasets.lastfm import get_lastfm
from implicit.lmf import LogisticMatrixFactorization
from implicit.nearest_neighbours import (BM25Recommender, CosineRecommender,
                                         TFIDFRecommender, bm25_weight)


edgelist_user_orders = "./reco_data/order/product_order.edgelist"
edgelist_user_visits = "./reco_data/visit/product_visit.edgelist"

user_product_file = "./user_product.json"
product_user_file = "./product_user.json"
user_user_file = "./user_user.json"
product_product_file = "./product_product.json"

orders = open(edgelist_user_orders, "r")
visits = open(edgelist_user_visits, "r")

upf = open(user_product_file, "w+")
puf = open(product_user_file, "w+")
uuf = open(user_user_file, "w+")
ppf = open(product_product_file, "w+")

model_name = "als"

data = dict()

user_nb = 0
product_nb = 0

MODELS = {"als":  AlternatingLeastSquares,
          "nmslib_als": NMSLibAlternatingLeastSquares,
          "annoy_als": AnnoyAlternatingLeastSquares,
          "faiss_als": FaissAlternatingLeastSquares,
          "tfidf": TFIDFRecommender,
          "cosine": CosineRecommender,
          "bpr": BayesianPersonalizedRanking,
          "lmf": LogisticMatrixFactorization,
          "bm25": BM25Recommender}


def get_model(model_name):
    print("getting model %s" % model_name)
    model_class = MODELS.get(model_name)
    if not model_class:
        raise ValueError("Unknown Model '%s'" % model_name)

    # some default params
    if issubclass(model_class, AlternatingLeastSquares):
        params = {'factors': 256, 'dtype': np.float32}
    elif model_name == "bm25":
        params = {'K1': 100, 'B': 0.5}
    elif model_name == "bpr":
        params = {'factors': 63}
    elif model_name == "lmf":
        params = {'factors': 30, "iterations": 40, "regularization": 1.5}
    else:
        params = {}

    return model_class(**params)


for visit in visits:
    tmp = visit.split()
    assert(len(tmp) == 2)
    user_id = tmp[0]
    prod_id = tmp[1]
    if user_id in data:
        prods = data[user_id]
        if prod_id in prods:
            prods[prod_id] = 5
        else:
            prods[prod_id] = 3
            product_nb += 1
    else:
        data[user_id] = {prod_id: 3}
        user_nb += 1
        product_nb += 1

for order in orders:
    tmp = order.split()
    assert(len(tmp) == 2)
    user_id = tmp[0]
    prod_id = tmp[1]
    if user_id in data:
        prods = data[user_id]
        if prod_id in prods:
            rating = prods[prod_id]
            if rating > 5:
                prods[prod_id] = 10
            else:
                prods[prod_id] = 10
        else:
            prods[prod_id] = 10
            product_nb += 1
    else:
        data[user_id] = {prod_id: 10}
        user_nb += 1
        product_nb += 1

print("Number of users : ", user_nb)
print("Number of products : ", product_nb)

lst = []
user_dic = {}
prod_dic = {}
user_dic_rev = {}
prod_dic_rev = {}

user_id = 0
prod_id = 0

check_user_id = 6969

for key, val in data.items():
    for key2, val2 in val.items():
        user_key = int(key)
        prod_key = int(key2)
        if user_key in user_dic:
            uid = user_dic[user_key]
        else:
            uid = user_id
            user_dic[user_key] = uid
            user_dic_rev[uid] = user_key
            user_id += 1
        if prod_key in prod_dic:
            pid = prod_dic[prod_key]
        else:
            pid = prod_id
            prod_dic[prod_key] = pid
            prod_dic_rev[pid] = prod_key
            prod_id += 1
        if uid == check_user_id:
            print(" --> ", prod_dic_rev[pid], " Note : ", val2)
        lst.append((pid, uid, val2))


def get_matrix(data_list):
    prod_col, user_col, rating_col = zip(*data_list)
    matrix = sparse.coo_matrix((rating_col, (prod_col, user_col)),
                               shape=(product_nb, user_nb))
    return matrix


user_matrix = get_matrix(lst)

model = get_model(model_name)


if issubclass(model.__class__, AlternatingLeastSquares):
    # lets weight these models by bm25weight.
    user_matrix = bm25_weight(user_matrix, K1=100, B=3)

    # also disable building approximate recommend index
    model.approximate_recommend = False

user_matrix = user_matrix.tocsr()

model.fit(user_matrix)


user_items = user_matrix.T.tocsr()
user_true_id = user_dic_rev[check_user_id]

recommandation = model.recommend(check_user_id, user_items)


print("User : ", user_true_id)
print("Recommandations : ")
for r in recommandation:
    print("Produit : ", prod_dic_rev[r[0]], " note : ", r[1])

top_product_users = {}
top_user_products = {}
similar_users = {}
similar_products = {}

#i = 0
#i_max = len(user_dic_rev)

for key in tqdm.tqdm(user_dic_rev):
    # if i % 100 == 0:
    #    print("Len --> ", i,"/",i_max, end='\r')
    # i += 1
    real_id = user_dic_rev[key]
    recommandations = model.recommend(key, user_items)
    sim_users = model.similar_users(key, 10)
    real_users = []
    for user in sim_users:
        real_users += [user_dic_rev[user[0]]]
    similar_users[real_id] = real_users
    real_recommandations = []
    for reco in recommandations:
        real_recommandations += [prod_dic_rev[reco[0]]]
    top_user_products[real_id] = real_recommandations
    top_recomandation = real_recommandations[0]
    if top_recomandation in top_product_users:
        liste = top_product_users[top_recomandation]
        if not real_id in liste:
            top_product_users[top_recomandation] = liste + [real_id]
    else:
        top_product_users[top_recomandation] = [real_id]

for key in tqdm.tqdm(prod_dic_rev):
    real_id = prod_dic_rev[key]
    sim_products = model.similar_items(key, 10)
    real_products = []
    for prod in sim_products:
        real_products += [prod_dic_rev[prod[0]]]
    similar_products[real_id] = real_products

puf_list = []
upf_list = []
uuf_list = []
ppf_list = []

# for key in tqdm.tqdm(top_product_users):
#     upf_list += [{"user_id": key, "product_list": top_product_users[key]}]

# for key in tqdm.tqdm(top_user_products):
#     puf_list += [{"product_id": key, "user_list": top_user_products[key]}]

# for key in tqdm.tqdm(similar_users):
#     uuf_list += [{"user_id": key, "user_list": similar_users[key]}]

# for key in tqdm.tqdm(similar_products):
#     ppf_list += [{"product_id": key, "product_list": similar_products[key]}]


json.dump(top_product_users, puf)
json.dump(top_user_products, upf)
json.dump(similar_users, uuf)
json.dump(similar_products, ppf)

puf.close()
upf.close()
uuf.close()
ppf.close()
