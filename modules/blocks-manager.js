'use strict';

var debug = require('debug')('arma:menu:manager');

var config = require('../modules/config');

var Q = require('q');
var db = require('./db').db;

var blocksManager = (function() {

	/**
	 * Construct a content manager
	 *
	 * @param config
	 * @constructor
	 */
	var BlocksManager = function (config) {
	};

    /**
     *
     * @param params
     * @returns Promise
     */
	BlocksManager.prototype.promiseMenuAndFooter = function (params) {
		var siteName = params.site;
        console.log('siteName', siteName);
        var metadata = config.all().metadata[siteName] || {};
        console.log('metadata', config.all().metadata);
        console.log('metadata', metadata);
        var menuParams = {
            site: siteName,
            sitename: metadata.title,
            baseUrl: '/' + siteName + '/',
            api: '/' + siteName + '/api',
            searchUrl:  '/' + siteName + '/search?q='
        };
        console.log('menuParams', menuParams);
        var deferred = Q.defer();
        db.cms_menu.find().toArray(function(err, items) {
            console.log(err);
            console.log(items);
        });
        db.cms_menu.findById(params.site, function (err, result) {
            console.log("ploupploup");
            menuParams.blocks = result || {menu: {children:[{id: 'home', label: 'Home'}]}};
            deferred.resolve(menuParams);
        });
        console.log("dsfdsfsdfdsfsfsdf");
        return deferred.promise;
	};
	return new BlocksManager(config.all().cms);
})();

module.exports = blocksManager;