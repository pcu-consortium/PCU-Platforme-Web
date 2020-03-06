'use strict';

var debug = require('debug')('arma:admin:manager');

var async = require('../async');
var config = require('../config');
var menuManager = require('../blocks-manager');
var contentManager = require('../cms/content-manager');

var Q = require('q');
var db = require('../db').db;

var adminManager = (function() {
	'use strict';

	var AdminManager = function (config) {
	};


    /**
     * Helper method to create a Promise for an admin page
     *
     * @param page      admin page
     * @param params    site parameters
     * @returns Promise
     */
    AdminManager.prototype.promisePage = function(page, params){
        console.log(params);
        var promise = menuManager.promiseMenuAndFooter(params);

        return promise.then(function (menuParams) {
            console.log('menuParams', menuParams);
            menuParams.content = {
                page: page,
                data: {
                    api: '/' + menuParams.site + '/api'
                }
            };
            return menuParams;
        });
    };

    AdminManager.prototype.editMenu = function (params, callback) {
        this.promisePage('cms/menu', params).then(function(siteParams){
            siteParams.content.data.blocks = siteParams.blocks;
            return siteParams;
        }).nodeify(callback);
    };

    AdminManager.prototype.editPage = function (params, callback) {
        this.promisePage('cms/page', params).then(function(siteParams){
            siteParams.content.data.pageId = params.pageId;
            siteParams.content.data.page = contentManager.promisePage(params.site, params.pageId);
            return async.resolvePromises(siteParams);
        }).nodeify(callback);
    };

    AdminManager.prototype.editSchema = function (params, callback) {
        this.promisePage('config/schema', params).nodeify(callback);
    };

    return new AdminManager(config.all().cms);
})();

module.exports = adminManager;
