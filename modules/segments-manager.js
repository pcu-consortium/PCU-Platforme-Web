'use strict';

var todo = require('debug')('arma-todo:segments');
var debug = require('debug')('arma:segments:manager');

var async = require('../modules/async');
var config = require('../modules/config');

var segmentsManager = (function() {

	/**
	 * Construct a content manager
	 *
	 * @param config
	 * @constructor
	 */
	var SegmentsManager = function (config) {
		this.host = config.api.host;
		this.entryPoint = config.api.entryPoint;
	};

    /**
     * Fetch segment topics
     *
     * @param params
     * @param callback
     */
	SegmentsManager.prototype.fetchTopics = function (params, callback) {
		var options = this.getOptionsOfTopicRequest(params);

		async.makePromise(options).then(function (res) {
            callback(null, res['TOPIC']);
		}).catch(function (error) {
			debug('Caught error', error);
			callback(error);
		}).done();
	};

    /**
     * Get options for a topic request
     *
     * @param params
     * @returns {{host: string, path: string, query: {segment: string}, method: string, headers: {Content-Type: string}}}
     */
    SegmentsManager.prototype.getOptionsOfTopicRequest = function (params) {
        todo("fix source API and remove 'fixSlashes' option");
        return {
            host: this.host,
            path: this.entryPoint + '/topics',
            query: {
                segment: params.segment
            },
            options: {
                fixSlashes: true // EVIL FIX
            },
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
    };

	return new SegmentsManager(config.all().cms);
})();

module.exports = segmentsManager;