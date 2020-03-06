'use strict';

var debug = require('debug')('arma:rameau:api-router');
var express = require('express');
var router = express.Router();
var manager = require('./rameau-manager.js');
var async = require('../async');
var path = require('path');

var processFetchJson = function(res){
    return function(err, obj){
        if (err) res.status(500).end();
        else res.json(obj);
    }
};

router.get('/rameau', function(req, res) {
    var q = req.query.q || "";
    var size = req.query.limit || 20;
    debug('async', async);
    async.resolvePromises({
        concepts: manager.search('concepts', q, size),
        periodics: manager.search('periodics', q, size)
    }).nodeify(processFetchJson(res));
});

router.put('/rameau/_multiGet', function(req, res){
    //var type = "concepts,periodics";
    manager.mget(req.body).nodeify(processFetchJson(res));
});

router.get('/rameau/:type/:id', function(req, res) {
    var id = req.params.id;
    var type = req.params.type;
    if (type == "*"){
        type == "concepts,periodics";
    }
    manager.get(id, type).nodeify(processFetchJson(res))
});


module.exports = router;
