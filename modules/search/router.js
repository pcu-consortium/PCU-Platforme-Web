'use strict';

var debug = require('debug')('arma:search:router');
var express = require('express');
var router = express.Router();

var pageUtils = require('../../utils/page-utils.js');

var searchManager = require('./search-manager');


/**
 * Search pages
 */
router.get('/search/:source?', function(req, res){
    pageUtils.computePage(searchManager, {
        app: 'search',
        q: req.query.q,
        sort: req.query.sort,
        filters: JSON.parse(req.query.filters || "[]"),
        limit: req.query.limit || 24,
        site: req.site,
        source: req.params.source,//req.query.source
    }, 'react-layout', req, res);
});

module.exports = router;
