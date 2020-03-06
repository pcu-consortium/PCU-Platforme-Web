'use strict';

var debug = require('debug')('arma:video:router');
var express = require('express');
var router = express.Router();

var contentManager = require('../cms/content-manager');
var analysisManager = require('./analysis-manager');
var async = require('../async');
var config = require('../config').all();

var pageUtils = require('../../utils/page-utils.js');

var crypto = require('crypto');

// function escapeAnalysisId(id){
//   var shasum = crypto.createHash('sha1');
//   shasum.update('<' + id + '>');
//   return shasum.digest('hex');
// }

function escapeVideoId(id){
  return id.replace(/[:\/#]/g, '_');
}

var fetchCampus = function(id){

  //debug('fetch', id);
  return async.makePromise({
    host: config.es.host, port: config.es.port, path: '/campusaar/_mget', method: "POST"
  }, {ids: [id]}).then(function(result){
    //debug('find', id, result);
    if (!result.docs[0].found){
      throw "Failed to find " + id;
    }
    var entry = result.docs[0]._source;
    entry._type = result.docs[0]._type;
    return entry;
  });
};


var fetchPresentationMetaData = function(id){
 // debug('fetchPresentationmetadata', id);
  return async.makePromise({
    host: 'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_analysis_media_presentation?uri='+id, method: "GET"
  }).then(function(result){
    return result;
  });
};


var fetchUsageMetaData = function(id){
 // debug('fetchUsageMetaData', id);
  return async.makePromise({
    host:  'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_analysis_media_usage?uri='+id, method: "GET"

  }).then(function(result){
    return result;
  });
};

var fetchRessourceMetaData = function(id){
//  debug('fetchRessourceMetaData', id);
  return async.makePromise({
    host:  'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_analysis_media_ressource?uri='+id, method: "GET"


  }).then(function(result){
    return result;
  });
};


var fetchRoleMetaData = function(id){
//  debug('fetchRoleMetaData', id);
  return async.makePromise({

    host: 'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_analysis_media_role?uri='+id, method: "GET"


  }).then(function(result){
    return result;
  });
};

var fetchVisuelMetaData = function(id){
 // debug('fetchVisuelMetaData', id);
  return async.makePromise({

    host: 'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_analysis_media_Objet?uri='+id+'&?type=visuel', method: "GET"

  }).then(function(result){
    return result;
  });
};

var fetchAudioMetaData = function(id){
//  debug('fetchAudioMetaData', id);
  return async.makePromise({

    host: 'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_analysis_media_Objet?uri='+id+'&?type=audio', method: "GET"

  }).then(function(result){
    return result;
  });
};


var fetchDroitMetaData = function(id){
  //debug('fetchDroitMetaData', id);
  return async.makePromise({

    host: 'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_analysis_info_media?uri='+id, method: "GET"

  }).then(function(result){
    return result;
  });
};

var fetchDiscoursMetaData = function(id){
 // debug('fetchDiscoursMetaData', id);
  return async.makePromise({

    host: 'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_analysis_discours?uri='+id, method: "GET"

  }).then(function(result){
    return result;
  });
};

var fetchSubjectMetaData = function(id){
//  debug('fetchSubjectMetaData', id);
  return async.makePromise({

    host: 'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_analysis_subject?uri='+id, method: "GET"

  }).then(function(result){
    return result;
  });
};

var fetchDocumentMetaData = function(id){
  debug('fetchDocumentMetaData', id);
  return async.makePromise({

    host:  'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_analysis_medialayer?uri='+id, method: "GET"

  }).then(function(result){
    return result;
  });
};

var fetchSegmentMetaData = function(id){
  var newid=id.split(";").map(function(item,idx){
      return 'http://campus-aar.fr/asa%23'+item
    }
  ).join(';');
 // debug('The new id: ',newid);
  return async.makePromise({

    host: 'lab2.armadillo.fr', port: 80, path: '/campus-aar-api/get_current_segments?segments='+newid, method: "GET"

  }).then(function(result){
    return result;
  });
};


// async function fetchAnyEscape(id){
//   debug('fetchAnyEscape', id);
//   try {
//     var res = await fetchCampus(escapeAnalysisId(id));
//     return res;
//   } catch(e){
//     return fetchCampus(escapeVideoId(id));
//   }
// }

router.get('/getvideoanalysis/:videoId', async function(req, res) {
  var videoAnalysis,video;
  try{
    videoAnalysis=  await fetchCampus(escapeVideoId(req.params.videoId));


    var videoId = analysisManager.unwrap(videoAnalysis.document.id);
    //debug('videoId',videoId);
    var video = await fetchCampus(escapeVideoId(videoId));

    videoAnalysis.layer = (videoAnalysis.layers || videoAnalysis.layer).map(layer => {
      var { segment, segments, ...newLayer } = layer;
      newLayer.segment = segment || segments;
      return newLayer;
    });
    delete videoAnalysis.layers;

    video=analysisManager.resolveMapping(video);
    videoAnalysis=analysisManager.resolveMapping(videoAnalysis);
  } catch(err){
    videoAnalysis={};
    video={}
  }
   //debug('videoAnalysis: ', videoAnalysis);
   res.send(JSON.stringify({video:video,videoAnalysis:videoAnalysis}));
   //res.send('hello');
});

router.get('/getsegments/:segmentId', async function(req, res) {
  var segments;
  try{
    var segments = await fetchSegmentMetaData(req.params.segmentId);
  } catch(err){
    segments={};
  }
   res.send(JSON.stringify(segments));
});


router.get('/video/:analysisId', async function(req, res) {
  var content = {};
  
  // Fetch analysis
  try {
   // debug('router video',req.params.analysisId);

    var videoAnalysis = await fetchCampus(escapeVideoId(req.params.analysisId));
    var videoPresentationMetaData = await fetchPresentationMetaData(encodeURIComponent(req.params.analysisId));
    var videoUsageMetaData = await fetchUsageMetaData(encodeURIComponent(req.params.analysisId));
    var videoRessourceMetaData = await fetchRessourceMetaData(encodeURIComponent(req.params.analysisId));
    var videoRoleMetaData = await fetchRoleMetaData(encodeURIComponent(req.params.analysisId));
    var videoVisuelMetaData = await fetchVisuelMetaData(encodeURIComponent(req.params.analysisId));
    var videoAudioMetaData = await fetchAudioMetaData(encodeURIComponent(req.params.analysisId));
    var videoDroitMetaData = await fetchDroitMetaData(encodeURIComponent(req.params.analysisId));
    var videoDiscoursMetaData = await fetchDiscoursMetaData(encodeURIComponent(req.params.analysisId));
    var videoSubjectMetaData = await fetchSubjectMetaData(encodeURIComponent(req.params.analysisId));
    var videoDocumentMetaData = await fetchDocumentMetaData(encodeURIComponent(req.params.analysisId));

//    debug('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      

//    debug('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');


  //debug('videoAnalysis.document.id',documentId);

    // Fetch video
    var videoId = analysisManager.unwrap(videoAnalysis.document.id);
    //debug('videoId',videoId);
    var video = await fetchCampus(escapeVideoId(videoId));

    /*
    var vmanager = require('./video-manager.js');
    debug('Making image');
    vmanager.processImages(escapeVideoId(videoId),video.instances[0].http_url);

    debug('Finish making image');
    */
    videoAnalysis.layer = (videoAnalysis.layers || videoAnalysis.layer).map(layer => {
      var { segment, segments, ...newLayer } = layer;
      newLayer.segment = segment || segments;
      return newLayer;
    });
    delete videoAnalysis.layers;

      debug('videoDocumentMetaData',videoDocumentMetaData);


    // Return content
    var content = {
      video: analysisManager.resolveMapping(video),
      videoAnalysis: analysisManager.resolveMapping(videoAnalysis),
      videoPresentationMetaData: videoPresentationMetaData,
      videoUsageMetaData: videoUsageMetaData,
      videoRessourceMetaData: videoRessourceMetaData,
      videoRoleMetaData: videoRoleMetaData,
      videoVisuelMetaData: videoVisuelMetaData,
      videoAudioMetaData: videoAudioMetaData,
      videoDroitMetaData: videoDroitMetaData,
      videoDiscoursMetaData: videoDiscoursMetaData,
      videoSubjectMetaData: videoSubjectMetaData,
      videoDocumentMetaData: videoDocumentMetaData
    };



    pageUtils.computePage(contentManager, {app: 'video-analysis', content: content}, 'react-layout', req, res); 
  } catch(err){
    debug(err);
    res.status(404);
    res.render('error', {
      message: err,
      error: {}
      // error: (app.get('env') === 'development') ? err : {}
    });
  }
});




module.exports = router;

