'use strict';

var todo = require('debug')('arma-todo:analysis:manager');
var debug = require('debug')('arma:analysis:manager');

var async = require('../async');
var config = require('../config');

// var _ = require('lodash');


/**
 * Fetch analysis
 *
 * @param params
 * @param callback
 */
 var searchAnalysis = function (params, callback) {
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
 var getOptionsOfSearchAnalysisRequest = function (params) {
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
 var getThumbnailFor = function (root) {
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
 var fixRoot = function (root) {
  return root.replace("fmsh:", "http://campus-aar.fr/asa#");
};

/**
 * Adds thumbnail urls to add to results
 *
 * @param items
 */
 var enrichResults = function (site, items) {
  var manager = this;
  items.forEach(function(it){
    it.root = manager.fixRoot(it.root);
    it.thumbnail = manager.getThumbnailFor(it.root);
    it.url = '/' + site + '/analysis/' + encodeURIComponent(it.root);
    debug(it);
  });
};

var promiseAnalysis = function(id, callback){
  // http://tamago.fr:9200/campusaar/analysis/_search?q=document:%22%3Chttp://campus-arr.fr/asa%2343e8144a-eb14-47c0-bda7-7bed63dbfcd4%3E%22
  return async.makePromise(options, postData)
};

var isId = function(value){
  if (typeof value != 'undefined'){
  if (value.length < 2) return false;
  return (value[0] === '<') && (value[value.length-1] === '>');}
  else {return  false;}
};


/*
 * Transform "<id>" into "id"
 */
var unwrap = function(value){
  return value.slice(0, value.length-1).slice(1);
};

var removeLanguage = function(str){
  return str.replace(/^"(.*)"@[a-z]+/g, "$1");
};

var resolveMapping = function(data){
  var mapping = require('./campus-mapping.json');
  var resolve = function(value){
    if (typeof value === 'undefined'){
      return value;
    }else if ((typeof value) === "string"){
      if (isId(value)){
        var v = unwrap(value);
        if (v in mapping) {
          return removeLanguage(mapping[v].fr);
        }
      }
      return removeLanguage(value);
    } else if (Array.isArray(value)){
      return value.map(resolve);
    } else if ((typeof value) == "object"){
      var obj = {}; // Both keys and values may need fixing
      for(var key in value){
        if (value.hasOwnProperty(key)){
          var fKey = resolve(key);
          var fValue = resolve(value[key]);
          obj[fKey] = fValue;
        }
      }
      return obj;
      // return _.mapValues(value, resolve);
    } else {
      return value;
    }
  };
  return resolve(data);
};  

module.exports = {
  unwrap: unwrap,
  resolveMapping: resolveMapping,
  promiseAnalysis: promiseAnalysis
};