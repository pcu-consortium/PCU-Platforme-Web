#!/usr/bin/env python3

import os
import json
import tqdm
import numpy as np
import scipy.sparse as sparse

# watchdog
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler

# implicit
from implicit.als import AlternatingLeastSquares
from implicit.approximate_als import (
    AnnoyAlternatingLeastSquares,
    FaissAlternatingLeastSquares,
    NMSLibAlternatingLeastSquares,
)
from implicit.bpr import BayesianPersonalizedRanking
from implicit.lmf import LogisticMatrixFactorization
from implicit.nearest_neighbours import (
    BM25Recommender,
    CosineRecommender,
    TFIDFRecommender,
    bm25_weight,
)

# flask
from flask import Flask
from flask_restful import Resource, Api
from flask_jsonpify import jsonify

from os import path

app = Flask(__name__)
api = Api(app)

default_file_loader = None

order_value = 8
multi_order_value = 10
visit_value = 3
multi_visit_value = 5

user_product_file = "./results/user_product"
product_user_file = "./results/product_user"
user_user_file = "./results/user_user"
product_product_file = "./results/product_product"


class UserReco(Resource):
    def get(self, model_number, user_id):
        model_number = int(model_number)
        if model_number >= len(default_file_loader.models):
            return jsonify({"recommandations": "Wrong model number"})
        if default_file_loader.training_done:
            if int(user_id) in default_file_loader.models[int(model_number)].top_user_products:
                recommandations = default_file_loader.models[int(model_number)].top_user_products[
                    int(user_id)
                ]
                recommandations = list(
                    map(lambda tpl: (tpl[0], str(tpl[1])), recommandations)
                )
                return jsonify({"recommandations": recommandations})
            else:
                return jsonify({"recommandations": "UserId not in database"})
        else:
            return jsonify({"recommandations": "Not finished training"})


class ProductReco(Resource):
    def get(self, model_number, product_id):
        model_number = int(model_number)
        if model_number >= len(default_file_loader.models):
            return jsonify({"recommandations": "Wrong model number"})
        if default_file_loader.training_done:
            if int(product_id) in default_file_loader.models[int(model_number)].top_product_users:
                recommandations = default_file_loader.models[int(model_number)].top_product_users[
                    int(product_id)
                ]
                # recommandations = list(map(lambda tpl: (tpl[0], str(tpl[1])), recommandations))
                return jsonify({"recommandations": recommandations})
            else:
                return jsonify({"recommandations": "ProductId not in database"})
        else:
            return jsonify({"recommandations": "Not finished training"})


class UserSim(Resource):
    def get(self, model_number, user_id):
        model_number = int(model_number)
        if model_number >= len(default_file_loader.models):
            return jsonify({"recommandations": "Wrong model number"})
        if default_file_loader.training_done:
            if int(user_id) in default_file_loader.models[int(model_number)].similar_users:
                recommandations = default_file_loader.models[int(model_number)].similar_users[
                    int(user_id)
                ]
                # recommandations = list(map(lambda tpl: (tpl[0], str(tpl[1])), recommandations))
                return jsonify({"recommandations": recommandations})
            else:
                jsonify({"recommandations": "UserId not in database"})
        else:
            return jsonify({"recommandations": "Not Finished training"})


class ProductSim(Resource):
    def get(self, model_number, product_id):
        model_number = int(model_number)
        if model_number >= len(default_file_loader.models):
            return jsonify({"recommandations": "Wrong model number"})
        if default_file_loader.training_done:
            if int(product_id) in default_file_loader.models[int(model_number)].similar_products:
                recommandations = default_file_loader.models[int(model_number)].similar_products[
                    int(product_id)
                ]
                # recommandations = list(map(lambda tpl: (tpl[0], str(tpl[1])), recommandations))
                return jsonify({"recommandations": recommandations})
            else:
                jsonify({"recommandations": "ProductId not in database"})
        else:
            return jsonify({"recommandations": "Not Finished training"})


api.add_resource(UserReco, "/userreco/<model_number>/<user_id>")
api.add_resource(ProductReco, "/productreco/<model_number>/<product_id>")
api.add_resource(UserSim, "/usersim/<model_number>/<user_id>")
api.add_resource(ProductSim, "/productsim/<model_number>/<product_id>")


class FileHandler(PatternMatchingEventHandler):
    @staticmethod
    def handle_data(customer_data, data, is_order):
        tmp = customer_data.split()
        assert len(tmp) == 2
        user_id = tmp[0]
        prod_id = tmp[1]
        if user_id in data:
            products = data[user_id]
            if prod_id in products:
                if is_order:
                    rating = products[prod_id]
                    if rating >= multi_visit_value:
                        products[prod_id] = multi_order_value
                    else:
                        products[prod_id] = order_value
                else:
                    products[prod_id] = multi_visit_value
            else:
                if is_order:
                    products[prod_id] = order_value
                else:
                    products[prod_id] = visit_value
                default_file_loader.product_number += 1
        else:
            if is_order:
                data[user_id] = {prod_id: order_value}
            else:
                data[user_id] = {prod_id: visit_value}
            default_file_loader.user_number += 1
            default_file_loader.product_number += 1
        return data

    def process(self, event):
        assert (
            default_file_loader is not None
            and default_file_loader.is_started is not False
        )
        default_file_loader.training_done = False
        default_file_loader.product_number = 0
        default_file_loader.user_number = 0
        data = {}

        for filename in os.listdir(default_file_loader.visit_dir_path):
            visit_file = open(
                default_file_loader.visit_dir_path + "/" + filename, "r"
            )
            for visit in visit_file:
                data = FileHandler.handle_data(visit, data, False)
            visit_file.close()

        for filename in os.listdir(default_file_loader.order_dir_path):
            order_file = open(
                default_file_loader.order_dir_path + "/" + filename, "r"
            )
            for order in order_file:
                data = FileHandler.handle_data(order, data, True)
            order_file.close()

        default_file_loader.generate_recommandations(data)
        default_file_loader.training_done = True

    def on_any_event(self, event):
        self.process(event)


class TrainingModel:
    MODELS = {
        "als": AlternatingLeastSquares,
        "nmslib_als": NMSLibAlternatingLeastSquares,
        "annoy_als": AnnoyAlternatingLeastSquares,
        "faiss_als": FaissAlternatingLeastSquares,
        "tfidf": TFIDFRecommender,
        "cosine": CosineRecommender,
        "bpr": BayesianPersonalizedRanking,
        "lmf": LogisticMatrixFactorization,
        "bm25": BM25Recommender,
    }

    @staticmethod
    def get_model(model_name):
        print("Getting model %s" % model_name)
        model_class = TrainingModel.MODELS.get(model_name)
        if not model_class:
            raise ValueError("Unknown Model '%s'" % model_name)

        # some default params
        if issubclass(model_class, AlternatingLeastSquares):
            params = {"factors": 256, "dtype": np.float32}
        elif model_name == "bm25":
            params = {"K1": 100, "B": 0.5}
        elif model_name == "bpr":
            params = {"factors": 63}
        elif model_name == "lmf":
            params = {"factors": 30, "iterations": 40, "regularization": 1.5}
        else:
            params = {}

        return model_class(**params)

    def __init__(self, data, product_number, user_number, model="als"):
        print(
            "Initiating model with",
            product_number,
            "products and",
            user_number,
            "users",
        )
        self.model_name = model
        self.model = TrainingModel.get_model(model)
        self.product_number = product_number
        self.user_number = user_number
        self.user_dic = {}
        self.prod_dic = {}
        self.user_dic_rev = {}
        self.prod_dic_rev = {}
        self.top_product_users = {}
        self.top_user_products = {}
        self.similar_users = {}
        self.similar_products = {}
        data_list = []
        internal_id_user = 0
        internal_id_prod = 0
        for key, val in data.items():
            user_key = int(key)
            if user_key in self.user_dic:
                uid = self.user_dic[user_key]
            else:
                uid = internal_id_user
                self.user_dic[user_key] = uid
                self.user_dic_rev[uid] = user_key
                internal_id_user += 1
            for key2, val2 in val.items():
                prod_key = int(key2)
                if prod_key in self.prod_dic:
                    pid = self.prod_dic[prod_key]
                else:
                    pid = internal_id_prod
                    self.prod_dic[prod_key] = pid
                    self.prod_dic_rev[pid] = prod_key
                    internal_id_prod += 1
                data_list.append((pid, uid, val2))
        self.data_list = data_list

    def train_model(self):
        prod_col, user_col, rating_col = zip(*self.data_list)
        matrix = sparse.csr_matrix(
            (rating_col, (prod_col, user_col)),
            shape=(self.product_number, self.user_number),
        )
        model = self.model
        if issubclass(model.__class__, AlternatingLeastSquares):
            matrix = bm25_weight(matrix, K1=100, B=3)
            model.approximate_recommend = False
        model.fit(matrix)
        self.matrix = matrix

    def generate_recommandations(self, use_data):
        user_items = self.matrix.T.tocsr()
        top_product_users = {}
        top_user_products = {}
        similar_users = {}
        similar_products = {}
        model = self.model
        upf = user_product_file + "." + self.model_name + ".json"
        puf = product_user_file + "." + self.model_name + ".json"
        uuf = user_user_file + "." + self.model_name + ".json"
        ppf = product_product_file + "." + self.model_name + ".json"
        if (
            not path.exists(upf)
            or not path.exists(puf)
            or not path.exists(uuf)
            or not path.exists(ppf)
            or use_data
        ):
            for key in tqdm.tqdm(self.user_dic_rev):
                real_id = self.user_dic_rev[key]
                recommandations = model.recommend(key, user_items)
                sim_users = model.similar_users(key, 10)
                real_users = []
                for user in sim_users:
                    real_users += [self.user_dic_rev[user[0]]]
                similar_users[real_id] = real_users

                real_recommandations = []
                for reco in recommandations:
                    real_recommandations += [
                            (self.prod_dic_rev[reco[0]], str(reco[1]))
                    ]
                top_user_products[real_id] = real_recommandations
                top_recommandation = real_recommandations[0][0]
                if top_recommandation in top_product_users:
                    liste = top_product_users[top_recommandation]
                    if real_id not in liste:
                        top_product_users[top_recommandation] = liste + [
                            real_id
                        ]
                else:
                    top_product_users[top_recommandation] = [real_id]

            for key in tqdm.tqdm(self.prod_dic_rev):
                real_id = self.prod_dic_rev[key]
                sim_products = model.similar_items(key, 10)
                real_products = []
                for prod in sim_products:
                    real_products += [self.prod_dic_rev[prod[0]]]
                similar_products[real_id] = real_products

            self.top_product_users = top_product_users
            self.top_user_products = top_user_products
            self.similar_users = similar_users
            self.similar_products = similar_products
            upf_file = open(upf, "w")
            puf_file = open(puf, "w")
            uuf_file = open(uuf, "w")
            ppf_file = open(ppf, "w")
            json.dump(top_product_users, puf_file)
            json.dump(top_user_products, upf_file)
            json.dump(similar_users, uuf_file)
            json.dump(similar_products, ppf_file)
        else:
            upf_file = open(upf, "r")
            puf_file = open(puf, "r")
            uuf_file = open(uuf, "r")
            ppf_file = open(ppf, "r")
            self.top_product_users = {int(k): v for k, v in json.load(puf_file).items()}
            self.top_user_products = {int(k): v for k, v in json.load(upf_file).items()}
            self.similar_users = {int(k): v for k, v in json.load(uuf_file).items()}
            self.similar_products = {int(k): v for k, v in json.load(ppf_file).items()}
        print("Nb p -> u : ", len(self.top_product_users))
        print("Nb u -> p : ", len(self.top_user_products))
        print("Nb u -> u : ", len(self.similar_users))
        print("Nb p -> p : ", len(self.similar_products))
        upf_file.close()
        puf_file.close()
        uuf_file.close()
        ppf_file.close()


class FileLoader:
    def __init__(self):
        self.data = {}
        self.order_dir_path = "./"
        self.visit_dir_path = "./"
        self.product_number = 0
        self.user_number = 0
        self.is_started = False
        self.training_done = False
        self.initialized = False
        self.models = []
        self.model_list = ['bpr', 'annoy_als', 'nmslib_als', 'faiss_als', 'als']
        # unknown idx : lmf
        # no signature : cosine tfidf bm25

    def start_watchdog(self, order_dir_path, visit_dir_path):
        self.order_dir_path = order_dir_path
        self.visit_dir_path = visit_dir_path
        self.is_started = True
        observer = Observer()
        observer.schedule(FileHandler(), os.path.dirname(order_dir_path), True)
        observer.start()
        self.observer = observer

    def generate_recommandations(self, data):
        self.models = []
        for model in self.model_list:
            print("Starting training with model : " + model)
            training_model = TrainingModel(
                data, self.product_number, self.user_number, model
            )
            training_model.train_model()
            training_model.generate_recommandations(self.initialized)
            self.models.append(training_model)
        self.initialized = True

    def stop_watchdog(self):
        self.observer.stop()
        self.observer.join()


if __name__ == "__main__":
    default_file_loader = FileLoader()
    default_file_loader.start_watchdog("./recommendation_data/order", "./recommendation_data/visit")
    os.system("touch ./recommendation_data/order")
    app.run(host='0.0.0.0', port="5002")
    default_file_loader.stop_watchdog()

    print("Goodbye !")
