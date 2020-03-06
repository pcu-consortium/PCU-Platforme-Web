
var environment;

var todo = require('debug')('arma-todo:config');
var info = require('debug')('arma:config');

if (process.env.NODE_ENV && process.env.NODE_ENV.length > 0) {
	environment = process.env.NODE_ENV;
} else {
	environment = 'production';
}

var perEnvironmentConfig = require('../config/' + environment + '/config.json');

var api = function(action, query){
  var url = "http://lab2.armadillo.fr/campus-aar-api/" + action;
  if (query){
      var queries = [];
      for(var key in query){
          if (query.hasOwnProperty(key)){
              queries.push(key + "=" + encodeURIComponent(query[key]));
          }
      }
      if (queries.length > 0){
          var joinChar = (url.indexOf('?') == -1) ? "?" : ":";
          url += joinChar + queries.join("&");
      }
  }
  return url;
};

var AAR_URI = "http://campus-aar.fr/asa/aar_root.owl";
var ARC_URI = "http://campus-aar.fr/asa/arc_root.owl";
var AHM_URI = "http://campus-aar.fr/asa/ahg_root.owl";

var config = (function () {
	var Config = function() {};
  var cache;
  Config.prototype.all = function () {
    if (!cache) {
      info('[INFO] Loading "{{ env }}" configuration'.replace('{{ env }}', environment));
      todo('change arc/ahm rootIds');

      cache = {
        "sites": ["agora", "campus", "arc", "ahm", "test", "psa","pcu"],
        "metadata": {
          agora: {
            title: "Agora"
          },
          arc: {
            title: "ARC"
          },
          ahm: {
            title: "AHM"
          },
          campus: {
            title: "CampusAAR"
          },
          test: {
            title: "Armadillo"
          },
          psa: {
            title: "PSA"
          }
          ,
          pcu: {
            title: "pcu"
          }
        },
        "cms": {
          "api": perEnvironmentConfig.api,
          "menu": {
            "agora": 22,
            "campus": 23,
            "arc": 22,
            "ahm": 22,
            "test": 22,
            "psa": 22
          },
          "subjects": {
            "agora": 3,
            "arc": 2,
            "ahm": 1503,
            "campus": 3,
            "test": 3,
            "psa": 3
          },
          "analysis": {
            "agora": "aar",
            "arc": "arc",
            "ahm": "ahm",
            "campus": "*",
            "test": "aar",
            "psa": "aar"
          }
        },
        "campus": {
          "agora": {
            host: "http://lab2.armadillo.fr/campus-aar-api/",
            uri: AAR_URI,
            ontology: "http://campus-aar.fr/asa/aar.owl"
          },
          "arc": {
            host: "http://lab2.armadillo.fr/campus-aar-api/",
            uri: ARC_URI,
            ontology: "http://campus-aar.fr/asa/arc.owl"
          },
          "ahm": {
            host: "http://lab2.armadillo.fr/campus-aar-api/",
            uri: AHM_URI,
            ontology: "http://campus-aar.fr/asa/ahg.owl"
          },
          "campus": {
            host: "http://lab2.armadillo.fr/campus-aar-api/",
            uris: [AAR_URI, ARC_URI, AHM_URI],
          }
        },
        "db": perEnvironmentConfig.db,
        "es": {
          "host": "localhost",

          "port": 9200
        }
      };
    }
    return cache;
  };

  //return new Config();
  return new Config();
})();


module.exports = config;
