
http://armadillolab.fr:9200/campusaar/analysis/_search?q=id:%22%3Chttp://escom.msh-paris.fr%23f810dcc8-91bc-4d71-9e8d-fa4b67c1bdb8%3E%22

'use strict';

var _ = require('lodash');
var debug = require('debug')('arma:data:elastic');

var async = require('../../modules/async');
var config = require('../../modules/config');

var querystring = require('querystring');

var elastic = (function() {

	/**
	 * Construct a content manager
	 *
	 * @param config
	 * @constructor
	 */
	var Elastic = function (config) {
        this.es = config.es;
	};

    Elastic.prototype.promisePost = function(options, data){
		var query = _.assign({host: this.es.host, port: this.es.port, method: "POST"}, options);
        return async.makePromise(query, data);
    };

    Elastic.prototype.escapeId = function(id){
    	return id.replace(/[:\/#]/g, '_');
    };

    Elastic.prototype.promiseById = function(id, options){
    	var options = options || {};
    	var cleanId = this.escapeId(id);
        return this.promisePost({path: '/campusaar/_mget'}, {ids: [cleanId]})
        .then(function(result){
	        debug('find', cleanId, result);
	        if (!result.docs[0].found){
	            throw "Failed to find " + cleanId;
	        }
	        var entry = result.docs[0]._source;
	        entry._type = result.docs[0]._type;
	        return entry;
	    });
    };


	return new Elastic(config.all());
})();

module.exports = elastic;