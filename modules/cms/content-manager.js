
var debug = require('debug')('arma:cms:manager');

var async = require('../async');
var config = require('../config');
var blocksManager = require('../blocks-manager');

var Q = require('q');
var db = require('../db').db;

var contentManager = (function() {
	'use strict';

	/**
	 * Construct a content manager
	 *
	 * @param config
	 * @constructor
	 */
	var ContentManager = function (config) {
		this.host = config.api.host;
		this.entryPoint = config.api.entryPoint;

		this.ERROR_UNKNOWN_SITE = 'Unknown site';

	};

	/**
	 * @param content
	 * @returns {*}
	 */
	ContentManager.prototype.getContentTitle = function (content) {
		if (!content) {
			return null;
		}

		return content.page[0].title;
	};

	/**
	 * Get a promise to retrieve site parameters
	 *  - site id
	 *  - title
	 *  - content
	 *  - menu
	 *
	 * @param params
	 * @param callback
	 */
	ContentManager.prototype.resolveSite = function (params, callback) {

		var promise = blocksManager.promiseMenuAndFooter(params, callback);
		var contentManager = this;
		var siteParams = {};
        var pageId = params.pageId;
        promise.then(function (menuParams) {
            console.log("============================");
            console.log(menuParams);
            console.log("============================");
            // Adds menu to parameters
            siteParams = menuParams;
            pageId = contentManager.ensureContentId(params.pageId, menuParams.blocks);
            siteParams.title = pageId;
            siteParams.app = 'CmsApp';
            siteParams.reactApp = params.app;
            siteParams.content = {
            };
            var sitePageId = siteParams.site + '.' + pageId;
            db.cms_page.findById(sitePageId, function(err, result){
                if (err || !result){
                    result = contentManager.makeDefaultPage(pageId, siteParams.site);
                }
                if (result.title){
                    siteParams.title = result.title;
                }
                result.pageId = pageId;
                siteParams.content.page = contentManager.upgradeWidget(result);
                callback(err, siteParams);
            });
        });
	};

    ContentManager.prototype.ensureContentId = function(pageId, blocks) {
        var contentId = pageId;
        if (!contentId) {
            contentId = "home";
            if (blocks && blocks.menu){
                if (Array.isArray(blocks.menu)){
                    if (blocks.menu.length > 0){
                        contentId = blocks.menu[0].children[0].id;
                    }
                } else if (blocks.menu.children && (blocks.menu.children.length > 0)){
                    contentId = blocks.menu.children[0].id;
                }
            }
        }
        return contentId;
    };

    /**
     *
     * @param site
     * @param pageId
     * @returns Promise
     */
    ContentManager.prototype.promisePage = function(site, pageId){
        var deferred = Q.defer();
        var sitePageId = site + '.' + pageId;
        db.cms_page.findById(sitePageId, function(err, result){
            if (err || !result){
                result = contentManager.makeDefaultPage(pageId);
            }
            var page = contentManager.upgradeWidget(result);
            deferred.resolve(page);
        });
        return deferred.promise;
    };

    ContentManager.prototype.makeDefaultPage = function(pageId, siteId){
        debug('makeDefaultPage', pageId, siteId);
        return {
            type: 'Page',
            title: pageId,
            site:  siteId,
            pageId: pageId,
            showTOC: false,
            children: [
                {
                    type: 'Html',
                    data: '<b>PAGE EN COURS DE CONSTRUCTION</b>'
                }
            ]
        }
    };

    /**
     * Upgrades widgets from the "old" syntax to the new one (uses CamelCase and root has "Page" type)
     *
     * @param data Page/Widget data
     * @param isRoot true if the widget is the page root
     * @returns {*}
     */
    ContentManager.prototype.upgradeWidget = function(data, isRoot){
        isRoot = typeof isRoot !== 'undefined' ? isRoot : true;
        if (!data){
            return data;
        }
        if (Array.isArray(data)){
            return data.map(function(d){return this.upgradeWidget(d, false);}.bind(this));
        }
        if (data.type && (data.type != 'ref') && (data.type != 'call') && (data.type != 'select') && (data.type != 'var')){
            // Remove '-' and capitalize everywhere : search-box => SearchBox
            var capitalizeFirstLetter = function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            };
            data.type = data.type.split('-').map(capitalizeFirstLetter).join('');
        }
        if (isRoot && !data.type){
            data.type = "Page";
        }
        if (data.type === "Columns"){
            var children = data.children || data.data;
            if (!children){
                children = [];
            }
            data.children = children.map(function(child){
                child = this.upgradeWidget(child, false);
                child.type = "Column";
                return child;
            }.bind(this));
            data.data = undefined;
        } else {
            //data.data = this.upgradeWidget(data.data, false);
        }
        data.children = this.upgradeWidget(data.children, false);
        return data;
    };

	return new ContentManager(config.all().cms);
})();

module.exports = contentManager;
