'use strict';

var debug = require('debug')('arma:subjects:manager');

var async = require('../modules/async');
var config = require('../modules/config');

var subjectsManager = (function() {

	/**
	 * Construct a content manager
	 *
	 * @param config
	 * @constructor
	 */
	var SubjectsManager = function (config) {
		this.host = config.api.host;
		this.entryPoint = config.api.entryPoint;
        this.subjectsId = config.subjects

		this.ERROR_UNKNOWN_SITE = 'Unknown site';
	};

	/**
	 * Fetch subjects
     * - note : rootId is optional
	 *
	 * @param site
	 * @param rootId
	 * @param callback
	 */
	SubjectsManager.prototype.fetchSubjects = function (site, rootId, callback) {
        if (!rootId){
            rootId = this.subjectsId[site];
        }
		var options = this.getOptionsOfSubjectsRequest(rootId);
		var subjectsManager = this;

		async.makePromise(options).then(function (subjects) {
            debug('found', subjects.length, 'subjects');
            callback(null, subjectsManager.subjectsAsTree(rootId, subjects));
		}).catch(function (error) {
			debug('Caught error', error);
			callback(error);
		}).done();
	};

    /**
     * Get options of subjects request
     *
     * @param site
     * @param rootId
     * @returns {{host: *, path: string, method: string, headers: {Content-Type: string}}}
     */
	SubjectsManager.prototype.getOptionsOfSubjectsRequest = function (rootId) {
		var subjectsPath = this.entryPoint + '/subjects?id=' + rootId + '&level=4';

		return {
			host: this.host,
			path: subjectsPath,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		};
	};

    SubjectsManager.prototype.subjectsAsTree = function (rootId, subjects) {
        debug('subjectsAsTree');
        var byId = {};
        for(var i=0; i<subjects.length; i++){
            var subject = subjects[i];
            byId[subject.mctid] = subject;
            subject.children = [];
        }
        for(var i=0; i<subjects.length; i++){
            var subject = subjects[i];
            var parent = byId[subject.pid];
            if (parent){
                parent.children.push(subject);
            }
        }

        var toJson = function(item){
            var children = item.children.map(toJson);
            if (children.length == 0){
                children = undefined;
            }
            return {
                id: item.mctid,
                label: item.word,
                term: item.term,
                children:children
            }
        };

        return toJson(byId[rootId]);
    };


	return new SubjectsManager(config.all().cms);
})();

module.exports = subjectsManager;