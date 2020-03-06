'use strict';

var debug = require('debug')('arma:campusaar:analysis:api-router');
var router = require('express').Router();

var apiUtils = require('../../../../utils/api-utils.js');
var manager = require('./analysis-manager');

router.get('/analysis/map', function(req, res){
  var params = {
    site: req.site
  };
  manager.fetchGeolocalisedAnalysis(params).nodeify(apiUtils.processFetchJson(res));
});

module.exports = router;

