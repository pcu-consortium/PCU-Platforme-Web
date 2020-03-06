'use strict';

var debug = require('debug')('arma:utils:api-utils');

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
        debug('processFetchJson', err, err && err.stack);
        if (err){
            res.status(500).end();
        } else {
            res.json(obj);
        }
    }
};

module.exports = {
  processFindOne: processFindOne,
  processUpdate: processUpdate,
  processFetchJson: processFetchJson
};