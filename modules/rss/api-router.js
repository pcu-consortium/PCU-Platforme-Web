'use strict';

var debug = require('debug')('arma:search:api-router');
var express = require('express');
var router = express.Router();

var rssManager  = require('./rss-manager');

// Prefix all routes
router.get('/rss', function(req, res){
    rssManager.fetchRss({
        url: req.query.url,
        limit: req.query.limit || 5
    }, function(err, results){
        if (err){
            debug('rss error', err);
            res.status(500).end();
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
