'use strict';

var debug = require('debug')('arma:video:manager');
var exec = require('child_process').exec;
var fs = require('fs');
var async = require('../async');

var uuid = require('node-uuid');
var Q = require('q');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var pendingProcess = {};

// Ensure directory...
var outputFolder = path.join(global.appRoot, 'files');

var execAsync = function(cmd){
  return function(){
    debug(cmd);
    var deferred = Q.defer();
    exec(cmd, function(err, stdout, stderr){
      if (err) {
        debug(stderr);
        deferred.reject(err);
      } else {
        debug(stdout);
        debug(stderr);
        debug(err);
        deferred.resolve();
      }
    });
    return deferred.promise;
  }
}

var downloadAs = function(url, tmpFilename){
  debug('downloadAs', url, tmpFilename);
  return execAsync("cp '" + url + "' '" + tmpFilename + "'")().then(tmpFilename);
  // return execAsync("wget '" + url + "' -O '" + tmpFilename + "'").resolve(tmpFilename);
};

var fetchVideo = function(videoId, tmpFilename){
  debug('fetchVideo', videoId, tmpFilename);  
  //var filename = "/Users/gregorypotdevin/armadillo/web/campus-aar/express/tools/waveform/video.mp4";
  var filename = "http://semioza.msh-paris.fr:1935/mp4/aar/1650_5156/5atelier04-LAN_180p.mp4";
  return downloadAs(filename, tmpFilename);
};

var promiseWaveform = function(videoFile, outputFile){
  debug('promiseWaveform', videoFile, outputFile);
  var cmd=global.appRoot + "/tools/waveform/waveform.sh '" + videoFile + "' '" + outputFile + "'";
  fs.access(outputFile, fs.F_OK, function(err) {
    if (err) {
      debug('Waveform file does not exist,making Waveform');
      debug(cmd);
      /*
      exec(cmd, function(error, stdout, stderr){
      //debug(cmd);
      if (error) {
        debug(stderr);
      }
      });*/
    }
  });
  //return execAsync(global.appRoot + "/tools/waveform/waveform.sh '" + videoFile + "' '" + outputFile + "'");
};

var promisePreview = function(videoFile, outputFile){
  // [HEIGHT=40] [COLS=16] [ROWS=8] [OUTPUT]
  debug('promisePreview', videoFile, outputFile);  
  var cmd=global.appRoot + "/tools/thumbnails/thumbnails.sh '" + videoFile + "'  40 16 8 '" + outputFile + "'";
  fs.access(outputFile, fs.F_OK, function(err) {
    if (err) {
      debug('Preview file does not exist,making Preview');
      debug(cmd);
      exec(cmd, function(error, stdout, stderr){
      //debug(cmd);
      if (error) {
        debug(stderr);
      }
      });
    }
  });  
  //return execAsync(global.appRoot + "/tools/thumbnails/thumbnails.sh '" + videoFile + "'  40 16 8 '" + outputFile + "'");
};



var deleteFile = function(filename){
  debug('deleteFile', filename);
  var deferred = Q.defer();
  fs.unlink(filename, function(err){
    if (err) deferred.reject(err);
    else deferred.resolve(filename);
  });
  return deferred.promise;
}

var processImages = function(videoId,url){

  var filename = path.join(outputFolder, uuid.v4() + ".mp4");
  var prefix = path.join(outputFolder, encodeURIComponent(videoId));
  promiseWaveform(url, prefix + "_waveform.png");
  promisePreview(url, prefix + "_preview.jpg");
  var data = {
      preview: {
        width: 53, // 71
        height: 40,
        rows: 16,
        cols: 8
      }
  };
  fs.writeFile(prefix + "_video.json", JSON.stringify(data), function(err) {
        if(err) {
          throw err;
        }
  }); 

  
  /*
  if (pendingProcess[videoId]){
    debug('already processing...');
    return;
  }
  pendingProcess[videoId] = true;
  var filename = path.join(outputFolder, uuid.v4() + ".mp4");
  var prefix = path.join(outputFolder, encodeURIComponent(videoId));
  fetchVideo(videoId, filename)
  //.then(promiseWaveform(filename, prefix + "_waveform.png"))
  .then(promiseWaveform(url, prefix + "_waveform.png"))
  .then(promisePreview(url, prefix + "_preview.jpg"))
  .then(function(){
    var data = {
      preview: {
        width: 53, // 71
        height: 40,
        rows: 16,
        cols: 8
      }
    };
    fs.writeFile(prefix + "_video.json", JSON.stringify(data), function(err) {
        if(err) {
          throw err;
        }
    }); 
  })
  .catch(function(reason){
    debug('ERROR', reason);
  })
  .then(deleteFile.bind(null, filename))
  .then(function(){
    pendingProcess[videoId] = null;
  });


*/
};

module.exports = {
  processImages: processImages
};

