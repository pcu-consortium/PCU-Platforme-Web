'use strict';

var todo = require('debug')('arma-todo:analysis:manager');
var debug = require('debug')('arma:analysis:manager');

var async = require('../modules/async');
var config = require('../modules/config');

var blocksManager = require('./blocks-manager');

var analysisManager = (function() {

    /**
     * Construct a content manager
     *
     * @param config
     * @constructor
     */
    var AnalysisManager = function (config) {
        this.host = config.api.host;
        this.entryPoint = config.api.entryPoint;
        this.analysisFilter = config.analysis;
    };

    AnalysisManager.prototype.resolveSite = function (params, callback) {

        var promise = blocksManager.promiseMenuAndFooter(params, callback);
        var contentManager = this;
        var siteParams = {};
        var pageId = params.pageId;

        promise.then(function (menuParams) {
            // Adds menu to parameters
            siteParams = menuParams;
            pageId = contentManager.ensureContentId(params.pageId, menuParams.blocks);
            siteParams.title = pageId;
            siteParams.app = 'AnalysisApp';
            siteParams.content = {
            };
            var sitePageId = siteParams.site + '.' + pageId;
            db.cms_page.findById(sitePageId, function(err, result){
                if (err || !result){
                    result = contentManager.makeDefaultPage(pageId);
                    debug('set default page', result);
                }
                if (result.title){
                    siteParams.title = result.title;
                }
                result.pageId = pageId;
                siteParams.content.page = result;
                callback(err, siteParams);
            });
        });
    };

    /**
     * Fetch analysis
     *
     * @param params
     * @param callback
     */
    AnalysisManager.prototype.searchAnalysis = function (params, callback) {
        var options = this.getOptionsOfSearchAnalysisRequest(params);
        var manager = this;

        async.makePromise(options).then(function (analysis) {
            manager.enrichResults(params.site, analysis.result);
            callback(null, analysis);
        }).catch(function (error) {
            debug('Caught error', error);
            callback(error);
        }).done();
    };

    /**
     * Get options of analysis request
     *
     * @param params
     * @returns {{host: string, query: {words: string, limit: number}, path: string, method: string, headers: {Content-Type: string}}}
     */
    AnalysisManager.prototype.getOptionsOfSearchAnalysisRequest = function (params) {
        var limit = params.limit || 5;
        todo('remove');
        var filter = this.analysisFilter[params.site];
        return {
            host: this.host,
            query: {
                words: filter,
                limit: limit
            },
            path: this.entryPoint + '/search_analyse',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
    };

    /**
     * Computes the thumbnail url from an analysis id
     *
     * @param root
     * @returns {string}
     */
    AnalysisManager.prototype.getThumbnailFor = function (root) {
        var startsWith = function (str, toFind, position) {
            position = position || 0;
            return str.lastIndexOf(toFind, position) === position;
        };
        if (startsWith(root, 'fmsh:')){
            var id = root.replace('fmsh:', '');
            return 'http://semiolive.ext.msh-paris.fr/Pictures/Thumbnails/' + id + '.jpg';
        }
        todo('set default logo');
        return '/images/thumbnail-aar.gif';
    };

    /**
     * Adjusts the root id to remove fmsh: prefix if needed
     *
     * @param root
     * @returns {string}
     */
    AnalysisManager.prototype.fixRoot = function (root) {
        return root.replace("fmsh:", "http://campus-aar.fr/asa#");
    };

    /**
     * Adds thumbnail urls to add to results
     *
     * @param items
     */
    AnalysisManager.prototype.enrichResults = function (site, items) {
        var manager = this;
        items.forEach(function(it){
            it.root = manager.fixRoot(it.root);
            it.thumbnail = manager.getThumbnailFor(it.root);
            it.url = '/' + site + '/analysis/' + encodeURIComponent(it.root);
            debug(it);
        });
    };

    return new AnalysisManager(config.all().cms);
})();

module.exports = analysisManager;