'use strict';

var debug = require('debug')('arma:cms:router');
var express = require('express');
var router = express.Router();
var contentManager = require('./content-manager');
var pageUtils = require('../../utils/page-utils.js');


/**
 * CMS pages
 */
router.get('/', function(req, res) {
    pageUtils.computePage(contentManager, {}, 'index', req, res);
});
router.get('/page/:pageId', function(req, res) {
    debug('pageId', req.params.pageId);
    pageUtils.computePage(contentManager, {pageId: req.params.pageId}, 'index', req, res);
});
router.get('/iframe/:pageId', function(req, res) {
    pageUtils.computePage(contentManager, {pageId: req.params.pageId}, 'iframe', req, res);
});

module.exports = router;
