'use strict';

var debug = require('debug')('arma:rss:manager');

var async = require('../../modules/async');
var config = require('../../modules/config');

var FeedParser = require('feedparser');
var request = require('request');

var rssManager = (function() {
	'use strict';

	/**
	 * Construct a rss manager
	 *
	 * @param config
	 * @constructor
	 */
	var RssManager = function (config) {
		this.host = config.api.host;
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
	RssManager.prototype.fetchRss = function (params, callback) {

        var req = request(params.url);
        var feedparser = new FeedParser({
            feedurl: params.url
        });
        var isSent = false;
        var results = [];

        var onError = function(err){
            debug('rss error', err);
            if (!isSent){
                callback(err);
                isSent = true; // Prevent double-sends (error after reading enough items)
            }
        };

        req.on('error', onError);
        req.on('response', function (res) {
            var stream = this;

            if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

            stream.pipe(feedparser);
        });

        feedparser.on('error', onError);
        feedparser.on('readable', function() {
            // This is where the action is!
            var stream = this
                , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
                , item;

            while (item = stream.read()) {
                //console.log(item);
                results.push({
                    title: item.title,
                    description: item.description,
                    link: item.link,
                    date: item.date,
                    author: item.author
                })
                if (!isSent && (results.length >= params.limit)){
                    isSent = true;
                    callback(null, results.slice(0, params.limit));
                    return;
                }
            }
        });

        feedparser.on('end', function() {
            if (!isSent){
                callback(null, results.slice(0, params.limit));
            }
        });
	};

	return new RssManager(config.all().cms);
})();

module.exports = rssManager;
