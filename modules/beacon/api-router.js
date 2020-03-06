'use strict';

var debug = require('debug')('arma:beacon:api-router');
var express = require('express');
var router = express.Router();
var async = require('../async.js');

router.get('/beacon', function(req, res){
  // var url = "http://spotlight.sztaki.hu:2225/";
  var text = req.query.text;
  debug(text);
  async.makePromise({
    host: 'spotlight.sztaki.hu',
    port: 2225,
    path: '/rest/annotate',
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
    query: {
      text: text
    }
  }).then(function(json){
    debug(json);
    res.json({
      text: text,
      terms: (json.Resources || []).map(function(term){
        return {
          uri: term["@URI"],
          types: term["@types"],
          term: term["@surfaceForm"],
          offset: term["@offset"]
        };
      })
    });
  });
});

module.exports = router;