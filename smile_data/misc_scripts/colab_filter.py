#!/usr/bin/env python3

import json
import tensorrec
import scipy.sparse as sparse

edgelist_user_orders = "./product_order.edgelist"
edgelist_user_visits = "./product_visit.edgelist"

orders = open(edgelist_user_orders, "r")
visits = open(edgelist_user_visits, "r")


customer_file = open("./cultura/customers.json", 'r')
customer_data = json.load(customer_file)

train_pc = 0.8

data = dict()

user_nb = 0
product_nb = 0

for visit in visits:
    tmp = visit.split()
    assert(len(tmp) == 2)
    user_id = tmp[0]
    prod_id = tmp[1]
    if user_id in data:
        prods = data[user_id]
        if prod_id in prods:
            prods[prod_id] = 0.5
        else:
            prods[prod_id] = 0.3
            product_nb += 1
    else:
        data[user_id] = {prod_id: 0.3}
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
            if rating > 0.5:
                prods[prod_id] = 1.0
            else:
                prods[prod_id] = 0.8
        else:
            prods[prod_id] = 0.7
            product_nb += 1
    else:
        data[user_id] = {prod_id: 0.7}
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
        lst.append((uid, pid, val2))

train_size = int(len(lst) * train_pc)

train_set = lst[:train_size]
test_set = lst[train_size:]

print("\n\n")
print("Training set size : ", len(train_set))
print("Test set size : ", len(test_set))


def get_matrix(data_list):
    user_col, prod_col, rating_col = zip(*data_list)
    matrix = sparse.coo_matrix((rating_col, (user_col, prod_col)),
                               shape=(user_nb, product_nb))
    return matrix


train_matrix = get_matrix(train_set)
test_matrix = get_matrix(test_set)

user_indicator_features = sparse.identity(user_nb)
item_indicator_features = sparse.identity(product_nb)

cf_model = tensorrec.TensorRec(
    n_components=10, loss_graph=tensorrec.loss_graphs.RMSELossGraph())

print("\n\n")
print("Training collaborative filter")

sparse_train_ratings_4plus = train_matrix.multiply(
    train_matrix >= 0.5)
sparse_test_ratings_4plus = test_matrix.multiply(
    test_matrix >= 0.5)


cf_model.fit(interactions=sparse_train_ratings_4plus,
             user_features=user_indicator_features,
             item_features=item_indicator_features,
             verbose=True, user_batch_size = 2048)


def check_results(ranks):
    train_recall_at_10 = tensorrec.eval.recall_at_k(
        test_interactions=sparse_train_ratings_4plus,
        predicted_ranks=ranks,
        k=10
    ).mean()
    test_recall_at_10 = tensorrec.eval.recall_at_k(
        test_interactions=sparse_test_ratings_4plus,
        predicted_ranks=ranks,
        k=10
    ).mean()
    print("Recall at 10: Train: {:.4f} Test: {:.4f}".format(train_recall_at_10,
                                                            test_recall_at_10))


print("Matrix factorization collaborative filter:")
predicted_ranks = cf_model.predict_rank(user_features=user_indicator_features,
                                        item_features=item_indicator_features)
check_results(predicted_ranks)
