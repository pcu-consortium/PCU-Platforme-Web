'use strict';

var debug = require('debug')('arma:rameau:manager');

var elastic    = require('../data/elastic');

var config = require('../config').all();
var async = require('../async');
var Q = require('q');

var search = function (type, q, size) {
  var q = q || "";
  var size = size || 20;
  if (q === ""){
    return async.makePromise({
      'host': config.es.host, port: config.es.port, path: '/rameau/' + type + '/_search', query: {size: size}, method: "POST"
    }, {
      "query": {
        "match_all" : { }
      }
    });
  }
  var query = {
    "query": {
      "bool": {
        "should": [
        {
          "match": {
            "prefLabel": {
              "query": '"' + q + '"',
              "boost": 10
            }
          }
        },
        {
          "query_string": {
            "query": q,
            "default_operator": "AND"
          }
        }
        ]
      }
    }
  };
  return async.makePromise({
    'host': config.es.host, port: config.es.port, path: '/rameau/' + type + '/_search', query: {size: size}, method: "POST"
  }, query);
};

var get = function(id, type){
  return async.makePromise({
    'host': config.es.host, port: config.es.port, path: '/rameau/_mget', method: "POST"
  }, {ids: [id]}).then(function(result){
    // console.log('find', id, result);
    if (!result.docs[0].found){
      throw "Failed to find " + id;
    }
    var entry = result.docs[0]._source;
    entry._type = result.docs[0]._type;
    return entry;
  }).then(function(entry){
    var keys = ['related', 'seeAlso', 'closeMatch', 'broader', 'narrower', 'foaf:focus'];
    var ids = [];
    var visitedIds = {};
    // console.log(entry);
    keys.forEach(function(key){
      // console.log('key', key);
      if (key in entry){
        // console.log(entry[key]);
        entry[key].forEach(function(obj){
          if (obj.id && !(obj.id in visitedIds)){
            visitedIds[obj.id] = true;
            ids.push(obj.id);
          }
        });
      }
    });
    // console.log('ids', ids);
    if (ids.length == 0){
      return processFetchJson(res)(null, entry); // Nothing to do
    }
    return async.makePromise({
      'host': config.es.host, port: config.es.port, path: '/rameau/_mget?fields=prefLabel,rdfs:label', method: "POST"
    }, {ids: ids})
    .then(function(data){
      var labels = {};
      data.docs.forEach(function(result){
        if (result.found){
         var getValue = function(arr){
           if (arr && arr.length > 0){
             return arr[0];
           }
           return undefined;
         };
         labels[result._id] = getValue(result.fields.prefLabel) || getValue(result.fields['rdfs:label']);
       }
     });
      keys.forEach(function(key){
        if (key in entry){
          entry[key] = entry[key].map(function(obj){
            if (obj.id && (obj.id in labels)){
              return {
                id: obj.id,
                label: labels[obj.id]
              }
            }
            return obj;
          });
        }
      });
      return entry;
    });
  });
};

var mget = function(ids){
  return async.makePromise({
      'host': config.es.host, port: config.es.port, path: '/rameau/_mget', method: "POST"
  }, {ids: ids}).then(function(result){
      return result.docs.map(function(doc){return doc._source;});
  });
};

module.exports = {
  search: search,
  get: get,
  mget: mget
};