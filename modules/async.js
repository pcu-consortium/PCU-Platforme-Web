var debug = require('debug')('arma:async');

var http = require('http');
var querystring = require('querystring');
var Q = require('q');

var async = (function () {
	var Async = function () {

	};

	/**
	 * Ensure status code is of OK Response
	 *
	 * @param res
	 * @returns {boolean}
	 */
	Async.prototype.isResponseOk = function (res) {
		return res.statusCode == 200;
	};


    Async.prototype.promiseJson = function (params) {
        var options = {
            host: params.host,
            path: params.path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (params.query){
            options.query = params.query;
        }
        if (params.port){
            options.port = params.port;
        }
        return this.makePromise(options);
    };

    Async.prototype.promiseForward = function (params) {
        var options = {
            host: params.host,
            path: params.path,
            method: 'GET',
            format: 'other'
        };
        if (params.query){
            options.query = params.query;
        }
        if (params.port){
            options.port = params.port;
        }
        return this.makePromise(options);
    };

	/**
	 * Make a promise
	 *
	 * @param options
	 * @returns {*}
	 */
	Async.prototype.makePromise = function (options, postData) {
		debug('makePromise', options);
        if (postData) debug('postData', JSON.stringify(postData));
        var deferred = Q.defer();
		var isResponseOk = this.isResponseOk;
        var fixSlashes = options.options && options.options.fixSlashes; // Fix crappy slashes in input

        debug(options);
        if (options.query){
            var str = querystring.stringify(options.query);
            if (str.length > 0){
                var queryChar = options.path.indexOf('?') == -1 ? '?' : '&';
                var path = options.path + queryChar + str;
                options.path = path;
            }
        }

		var reject = function(message) {
			debug('Rejecting', options.host, 'with message, ', message);
			deferred.reject(message);
		};

		var req = http.request(options, function(res)  {
			var output = '';

			res.setEncoding('utf8');

			res.on('data', function (chunk) {
                if (fixSlashes){
                    output += chunk.replace(/\\/g, '\\\\');
                } else {
                    output += chunk;
                }
			});

			res.on('end', function() {
				if (isResponseOk(res)) {
					debug('Resolving request with path', options.path);

                    var format = options.format || "json";
                    if (format == "json"){
                        // Autoparse json :)
                        try {
                            var parsedOutput = JSON.parse(output)
                        } catch (error) {
                            reject(error);
                        }
                    } else {
                        parsedOutput = output;
                    }
					deferred.resolve(parsedOutput);
				} else {
					var message = 'Invalid status code (' + res.statusCode + ')';
					reject(message);
				}
			});
		});

        if (postData){
            if ((typeof postData) === "object"){
                // debug("post data", postData);
                postData = JSON.stringify(postData);
            }
            req.write(postData);
        }

		req.setTimeout(5000);

		req.on('error', reject);

		req.end();

		return deferred.promise;
	};



    /**
     * Takes a javascript object and resolves all promises it contains
     * @param object
     * @returns {Promise}
     */
    Async.prototype.resolvePromises = function(object){
        var promises = [];
        // Iterate over object and find nested promises
        var iterObject = function(obj){
            var process = function(key){
                var v = obj[key];
                if (Q.isPromise(v)){
                    promises.push(v.then(function(value){
                        debug(key, value);
                        obj[key] = value;
                    }));
                } else if ((typeof v) === "object"){
                    iterObject(v);
                }
            };
            for(var key in obj){
                if (obj.hasOwnProperty(key)){
                    process(key);
                }
            }
        };
        iterObject(object);
        return Q.all(promises).thenResolve(object);
    };

	return new Async();
})();

module.exports = async;