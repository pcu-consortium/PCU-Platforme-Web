'use strict';

var debug = require('debug')('arma:admin:router');
var express = require('express');
var router = express.Router();
var adminManager = require('./admin-manager');

var outputPage = function(layout, res) {
    return function (error, siteParameters) {
        if (error) {
            debug(error);
            res.statusCode = 500;
            res.end();

            return;
        }

        if (siteParameters === null) {
            res.statusCode = 404;
            res.end();

            return;
        }

        res.render(layout, siteParameters);
        res.end();
    };
};

router.get('/cms/menu', function(req, res){
    adminManager.editMenu({
        site: req.site
    }, outputPage('admin', res));
});
router.get('/cms/page/:pageId', function(req, res){
    adminManager.editPage({
        site: req.site,
        pageId: req.params.pageId
    }, outputPage('admin', res));
});

router.get('/config/schema', function(req, res){
    var params = {
        site: req.site
    };
    adminManager.promisePage('config/schema', params).nodeify(outputPage('admin', res));
});

router.get('*', function(req, res){
    // Catch all...
    var site = req.site;
    outputPage('admin-app', res)(null, {
        site: site,
        api: '/' + site + '/api',
        searchUrl:  '/' + site + '/search?q=',
        content: {
            page: "*",
            data: {
                api: '/' + site + '/api'
            }
        }
    });
});


// Prefix all routes
var adminRouter = express.Router();
adminRouter.use('/admin', router);

module.exports = adminRouter;
