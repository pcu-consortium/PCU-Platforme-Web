'use strict';

var debug = require('debug')('arma:campusaar:subjects:api-router');
var router = require('express').Router();

var apiUtils = require('../../../../utils/api-utils.js');
var manager = require('./subjects-manager');
var searchManager = require('../../../search/search-manager');

router.get('/subjects', function(req, res){
  var params = {
    site: req.site,
    lang: req.query.lang
  };
  manager.fetchSubjects(params).nodeify(apiUtils.processFetchJson(res));
});

function addRoute(route, managerFunc){
  router.get(route, async function(req, res){
    try {
      res.json(await managerFunc(req.site));
    } catch(e){
      debug('err', e);
      res.status(500).end();
    }
  });
}

addRoute('/themes/audiovisual',  manager.fetchAudioVisual);
addRoute('/themes/glossary', manager.fetchGlossary);
addRoute('/themes/analysisTypes', manager.fetchAnalysisTypes);
addRoute('/roles', manager.fetchRolesTypes);
addRoute('/classification', manager.fetchClassification);
addRoute('/traduction', manager.fetchTraduction);
addRoute('/discours',manager.fetchDiscours);
addRoute('/usage',manager.fetchUsage);

router.get('/topics', function(req, res){
  manager.fetchTopics(req.query.uri).nodeify(apiUtils.processFetchJson(res)); 
});

router.get('/discours', function(req, res){
  manager.fetchDiscours(req.query.uri).nodeify(apiUtils.processFetchJson(res)); 
});



router.get('/classification/analysis', async function(req, res){
  const uri = req.query.uri;
  try {
    res.json(await manager.fetchClassificationAnalysis(req.site, uri));
  } catch(e){
    debug('err', e);
    res.status(500).end();
  }
});

router.post('/analysis/_mget', async function(req, res){
  try {
    var documents = await manager.fetchIds(req.site, req.body.ids || []);
    res.json(documents);
  } catch(e){
    debug('err', e);
    res.status(500).end();
  }
});

module.exports = router;

