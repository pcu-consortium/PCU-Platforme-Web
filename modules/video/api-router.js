'use strict';

var debug = require('debug')('arma:video:api-router');
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var manager = require('./video-manager.js');
var analysisManager = require('./analysis-manager.js');

fs.mkdir(path.join(global.appRoot, 'files'),function(e){
    // if(!e || (e && e.code === 'EEXIST')){
    //     //do something with contents
    // } else {
    //     //debug
    //     console.log(e);
    // }
});


var processFetchJson = function(res){
    return function(err, obj){
        if (err) res.status(500).end();
        else res.json(obj);
    }
};

var makeUrl = function(req, path){
  var prefix = '/' + (req.site ? (req.site + '/') : '');
  return req.protocol + '://' + req.get('Host') + prefix + 'api/videos/' + path;
}

var sendVideoFile = function(res, videoId, fileName){
  var options = {
    root: path.join(global.appRoot, 'files')
  };

  res.sendFile(fileName, options, function(err){
    if (err) {
      debug(err);
      res.status(err.status).end();
    }
    else {
      debug('Sent:', fileName);
    }
  })
}

router.get('/:videoId/images', function(req, res){
  var id = req.params.videoId;
  var encodedId = encodeURIComponent(id);
  var isReady = false;
  if (!isReady){
    //manager.processImages(id); // Launch encoding
    res.json({
      wip: true
    });
  } else {
    res.json({
      waveform: {
        url: makeUrl(req, encodedId + '/waveform')
      },
      preview: {
        width: 53, // 71
        height: 40,
        rows: 16,
        cols: 8,
        url: makeUrl(req, encodedId + '/preview')
      }
    });
  }
});

router.get('/:videoId/preview', function(req, res){
  var videoId = req.params.videoId;
  sendVideoFile(res, videoId, videoId + "_preview.jpg");
});

router.get('/:videoId/waveform', function(req, res){
  var videoId = req.params.videoId;
  sendVideoFile(res, videoId, videoId + "_waveform.png");
});

var analysisRouter = express.Router();
analysisRouter.get('/video-analysis/:analysisId', function(req, res){
  var analysisId = req.params.analysisId;
  analysisManager.promiseAnalysis(analysisId)
    .nodeify(processFetchJson(res));
});

// Prefix all routes
var videoRouter = express.Router();
videoRouter.use('/videos', router);

var apiRouter = express.Router();
apiRouter.use(videoRouter);
apiRouter.use(analysisRouter);

module.exports = apiRouter;