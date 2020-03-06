'use strict';

var debug = require('debug')('arma:search:api-router');
var express = require('express');
var router = express.Router();
var searchManager = require('./search-manager.js');
var path = require('path');

var processFetchJson = function(res){
    return function(err, obj){
        if (err) res.status(500).end();
        else res.json(obj);
    }
};

var splitParam = function(param){
    return param ? param.split(',') : undefined;
}

var searchMedias = function(req, res){
    var params = {
        site: req.site,
        q: req.query.q || req.query.query,
        type: req.query.type,
        sort: req.query.sort,
        filters: JSON.parse(req.query.filters || "[]"),
        limit: (req.query.limit || 24),
        offset: req.query.offset,
        source: req.params.source,
        select: splitParam(req.query.select),
        facets: splitParam(req.query.facets),
        noFacets: (req.query['no-facets'] || (req.query['no-facets'] === ""))
    };
    searchManager.promiseSearchMedias(params).nodeify(processFetchJson(res));
};

router.get('/medias', searchMedias);
router.get('/search/:source?', searchMedias);

router.get('/search/facets/:facet', function(req, res){
    var params = {
        site: req.site,
        q: req.query.q,
        type: req.query.type,
        filters: JSON.parse(req.query.filters || "[]"),
        limit: req.query.limit,
        source: req.query.source
    };
    searchManager.promiseSearchFacets([req.params.facet], params).nodeify(processFetchJson(res));
});

router.get('/medias/tags', function(req, res){
    var params = {
        site: req.site,
        limit: (req.query.limit || 24),
        offset: req.query.offset
    };
    searchManager.promiseMediaTagCloud(params).nodeify(processFetchJson(res));
});

router.get('/medias/facets/:facet', function(req, res){
    var params = {
        site: req.site,
        limit: (req.query.limit || 24),
        offset: req.query.offset
    };
    searchManager.promiseMediaTagCloud(params).nodeify(processFetchJson(res));
});

var fileOptions = {
    headers: {
        "Cache-Control": "max-age=345600",
        "Expires": new Date(Date.now() + 345600000).toUTCString()
    }
};

router.get('/exemplaires/:ex_id/thumbnail', function (req, res) {
    var dir = req.params.ex_id[0];
    var filename = req.params.ex_id + '.vig.jpg';
    var filepath = path.join(global.appRoot, 'files', 'images', 'vig', dir, filename);
    res.sendFile(filepath, fileOptions);
});

router.get('/exemplaires/:ex_id/image', function (req, res) {
    var dir = req.params.ex_id[0];
    var filename = req.params.ex_id + '.wmg.jpg';
    var filepath = path.join(global.appRoot, 'files', 'images', 'wmg', dir, filename);
    res.sendFile(filepath, fileOptions);
});

module.exports = router;
