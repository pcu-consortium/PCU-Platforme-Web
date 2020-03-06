var debug = require('debug')('arma:api:router');
var todo = require('debug')('arma-todo:api:router');

var express = require('express');
var router = express.Router();
var url = require('url');
var config = require('../modules/config').all();

var subjectsManager = require('../modules/subjects-manager');
var analysisManager = require('../modules/analysis-manager');
var segmentsManager = require('../modules/segments-manager');
var vocabManager    = require('../modules/vocab-manager');

var elastic    = require('../modules/data/elastic');

var async = require('../modules/async');
var Q = require('q');

var db = require('../modules/db').db;

var xml2js = require('xml2js');
var _ = require('lodash');

var OFFLINE_MODE = false;

var resolvePromises = function(object){
    var promises = [];

    // For variable capture...
    var processPromise = function(obj, key){
        promises.push(obj[key].then(function(value){
            debug(key, value);
            obj[key] = value;
        }));
    };

    // Iterate over object and find nested promises
    var iterObject = function(obj){
        for(var key in obj){
            if (obj.hasOwnProperty(key)){
                var v = obj[key];
                if (Q.isPromise(v)) {
                    processPromise(obj, key);
                } else if ((typeof v) === "object"){
                    iterObject(v);
                }
            }
        }
    };
    iterObject(object);
    return Q.all(promises).thenResolve(object);
};

/**
 * Returns a function which will either return the result or a 404 error
 *
 * @param res
 * @returns {Function}
 */
var processFindOne = function(res){
    return function(err, result){
        if (err || !result){
            res.status(404).end();
        } else {
            if (Array.isArray(result)){
                result.forEach(function(r){
                    delete r._id;
                });
            } else {
                delete result._id;
            }
            res.json(result);
        }
    };
};

/**
 * Returns a function to process updates (empty result or 500 error)
 *
 * @param res
 * @returns {Function}
 */
var processUpdate = function(res){
    return function(err, items){
        debug('processUpdate', err, items);
        if (err){
            debug('err', err);
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    }
};

var processFetchJson = function(res){
    return function(err, obj){
        debug('processFetchJson', err, obj);
        if (err){
            res.status(500).end();
        } else {
            res.json(obj);
        }
    }
};

var fetchJson = function(options, res){
    async.promiseJson(options).nodeify(processFetchJson(res));
};

var forward = function(options, res){
    async.promiseForward(options).nodeify(function(err, data){
        if (err){
            debug('err', err);
            res.status(500).end();
        } else {
            res.send(data);
            res.end();
        }
    });
};



router.get('/documents/:id', function(req, res){
    elastic.promiseById(req.params.id).nodeify(processFetchJson(res));
});

/**
 * Analyses routes
 */
router.get('/analysis', function(req, res){
    analysisManager.searchAnalysis({
        site: req.site,
        limit: req.query.limit
    }, function(err, analysis){
        res.json(analysis);
    });
});

/**
 * Segment routes
 */
router.get('/segments/:id/topics', function(req, res){
    segmentsManager.fetchTopics({
        segment: req.params.id,
        limit: req.query.limit
    }, function(err, topics){
        res.json(topics);
    });
});

router.get('/vocabs/autocomplete', function(req, res){
    var q = encodeURIComponent(req.query.q) + '*';
    fetchJson({
        host: 'storm.armadillo.fr',
        path: '/api/v1/Query?tbname=VOCABULAIRE&limit=10&q=' + q
    }, res);
});

router.get('/vocabs/:id(\\d+)', function(req, res){
    if (OFFLINE_MODE){
        vocabManager.fetchVocab({
            word: req.word
        }, function(err, results){
            if (err){
                debug('rss error', err);
                res.status(500).end();
            } else {
                res.json(results);
            }
        });
        return;
    }
    fetchJson({
        host: 'storm.armadillo.fr',
        path: '/api/v1/vocabs/' + encodeURIComponent(req.params.id)
    }, res);
});

router.get('/vocabs/:word', function(req, res){
    if (OFFLINE_MODE){
        vocabManager.fetchVocab({
            word: req.word
        }, function(err, results){
            if (err){
                debug('rss error', err);
                res.status(500).end();
            } else {
                res.json(results);
            }
        });
        return;
    }
    async.promiseJson({
        host: 'storm.armadillo.fr',
        path: '/api/v1/Query?tbname=VOCABULAIRE&limit=10&q=' + encodeURIComponent(req.params.word)
    }).then(function(arr) {
        if (!arr || arr.length == 0 || !arr[0].docid) {
            res.status(404).end();
            return;
        }
        var docid = arr[0].docid;
        fetchJson({
            host: 'storm.armadillo.fr',
            path: '/api/v1/vocabs/' + encodeURIComponent(docid)
        }, res);
    });

});

router.get('/stats', function(req, res){
    forward({
        host: 'tamago.fr',
        path: 'cube/iplabel',
        port: 13824,
        query: req.query
    }, res);
});

router.get('/url', function(req, res) {
    forward(url.parse(req.query.url), res);
});
router.get('/jsonify', function(req, res) {
    var onResult = function(err, data){
        if (err){
            debug('err', err);
            res.status(500).end();
        } else {
            res.json(data);
        }
    };
    async.promiseForward(url.parse(req.query.url))
        .then(function(data) {
        if (req.query.format == 'xml'){
            var parser = new xml2js.Parser({
                explicitArray: false,
                //mergeAttrs: true // merge attributes into record
            });
            parser.parseString(data, onResult);
        } else {
            onResult(null, data);
        }
    });
});


router.get('/schemas', function(req, res){
    res.json([
        {id: "sys.schema", label: "Schema"},
        {id: "sys.thesaurus", label: "Thesaurus"},
        {id: "document", label: "Document"}
    ]);
});

router.get('/users', function(req, res){
    res.json([
        {id: "user1", name: "User 1", email: "user1@armadillo.fr"},
        {id: "user2", name: "User 2", email: "user2@armadillo.fr"},
        {id: "user3", name: "User 3", email: "user3@armadillo.fr"}
    ]);
});

router.get('/tmp/:table/:id', function(req, res){
    db.tmp.findById(req.params.table + '.' + req.params.id, processFindOne(res));
});
router.put('/tmp/:table/:id', function(req, res){
    var obj = _.extend({
        _table: req.params.table,
        _site: req.params.site
    }, req.body);
    db.tmp.updateById(req.params.table + '.' + req.params.id, {$set:obj}, {upsert: true}, processUpdate(res));
});
router.get('/tmp/:table', function(req, res){
    db.tmp.find({_table: req.params.table}).toArray(processFindOne(res));
});
// router.delete('/tmp/:table', function(req, res){
//     db.tmp.find({_table: req.params.table}).toArray(processFindOne(res));
// });

_.forIn(require('../modules'), function(module, moduleName) {
  if (module.apiRouter){
    debug('add api routes for ' + moduleName);
    router.use(module.apiRouter);
  }
});


//router.get('/schemas/:id', function(req, res){
//
//});

module.exports = router;
