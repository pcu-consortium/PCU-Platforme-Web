'use strict';

var _ = require('lodash');
var todo = require('debug')('arma-todo:search:manager');
var debug = require('debug')('arma:search:manager');

var async = require('../../modules/async');
var config = require('../../modules/config');
var blocksManager = require('../../modules/blocks-manager');
var Entities = require('html-entities').XmlEntities;

var querystring = require('querystring');
var Q = require('q');

var OFFLINE_MODE = false;

var searchManager = (function() {

  const campusConfig = {
    path: 'campusaar/analysis',
    select: [
    'id', 'ontology', 'label', 'shortDescription', 
    'Auteur_de_l_analyse.label', 
    'metadata.label', 'metadata.subTitle', 'metadata.mediaDuration', 'metadata.language',
    'thumbnail'
    ],
    facets: {
      "ontology": { label: 'Ontologie', raw: true, icon: 'database' },
      "Auteur de l'analyse.label": { label: 'Auteur de l\'analyse', raw: true, icon: 'user' },
      "metadata.dateOfRealisation": { 
        search_type: {
          date_histogram: {
            "field": "metadata.dateOfRealisation",
            "interval": "1M",
            "format": "yyyy-MM"
          }
        },
        type: "date",
        label: 'Date de réalisation',
        icon: "calendar"
      },
      "metadata.place": { label: "Adresse", raw: true, icon: 'map-marker' },
      "metadata.language": { label: "Langue", raw: true, icon: 'language' },
      "metadata.Conférencier.label": { label: "Conférencier", raw: true, icon: 'user' },
      "metadata.Organisateur de la conférence.label": { label: "Organisateur", raw: true, icon: 'user' },
      "metadata.Responsable éditoriale AAR.label": { label: "Responsable éditoriale", raw: true, icon: 'user' },
      "metadata.Assistant de réalisation.label": { label:"Assistant de réalisation", raw: true, icon: 'user' },
      "metadata.about.label": { label:"About", raw: true, icon: 'tag' },
      "metadata.context.description": { label:"Contexte", raw: true, icon: 'file-text' },
    },
    sort: {
      "date": [ { "metadata.dateOfRealisation" : {"order" : "desc"}}, "_score" ]
    }
  };
  const mediaConfig = {
    path: 'campusaar/medias',
    facets: {
      "authors": { label: 'Auteurs', untouched: true, icon: 'user'},
      "contributors": { label: 'Contributeurs', untouched: true, icon: 'user'},
      "producers": { label: 'Producteurs', untouched: true, icon: 'user'},
      "languages": { label: 'Langues', icon: 'language'},
      "tags": { label: 'tags', icon: 'tag', untouched: true},
      "realisation_date": { 
        search_type: {
          date_histogram: {
            "field": "realisation_date",
            "interval": "1M",
            "format": "yyyy-MM"
          }
        },
        type: "date",
        label: 'Date de réalisation',
        icon: "calendar"
      },
    }
  }

  const michelinConfig = {
    path: 'michelin',
    facets: {
      "base": { icon: "database" },
      "nombase": { icon: "database" },
      "descmc": { icon: "tag" },
      "descglob": { icon: "tag" },
      "media": { icon: "file" },
      "createdby": { icon: "user" },
      "editeur": { icon: "user" }
    }
  };
  const psaConfig = {
    path: 'psa',
    facets: {
      "base": { icon: "database" },
      "typvehiculeproduit": { raw: true, icon: "car" },
      "silhouette": { raw: true, icon: "car" },
      "mc": { raw: true, icon: "tag" },
      "environpdv": { raw: true, icon: "camera" },
      "anglepdv": { raw: true, icon: "repeat" },
      "lieupdv": { raw: true, icon: "map-marker" }
    },
    sort: {
      "date": [ { "date_exacte" : {"order" : "desc"}}, "_score" ]
    }
  };

  const configs = {
    'psa': psaConfig,
    'michelin': michelinConfig,
    'agora': {
      ...campusConfig,
      filters: [
      {"ontology": "<http://campus-aar.fr/asa/aar.owl>"}
      ]
    },
    'arc': {
      ...campusConfig,
      filters: [
      {"ontology": "<http://campus-aar.fr/asa/arc.owl>"}
      ]
    },
    'ahm': {
      ...campusConfig,
      filters: [
      {"ontology": "<http://campus-aar.fr/asa/ahg.owl>"}
      ]
    },
    'campus': campusConfig,
    'medias': mediaConfig
  }

  function facetsForSite(site){
    return configs[site].facets;
  };

  /**
   * Construct a content manager
   *
   * @param config
   * @constructor
   */
   var SearchManager = function (config) {
    this.host = config.cms.api.host;
    this.es = config.es;
    this.entryPoint = config.cms.api.entryPoint;
    this.entities = new Entities();
  };

  /**
   * Get a promise to retrieve site parameters
   *
   * @param params
   * @param callback
   */
   SearchManager.prototype.resolveSite = function (params, callback) {

    var promise = blocksManager.promiseMenuAndFooter(params, callback);
    var siteParams = {};
    promise.then(function (menuParams) {
      // Adds menu to parameters
      siteParams = menuParams;
      siteParams.title = 'Recherche';
      siteParams.app = 'SearchApp';
      siteParams.reactApp = params.app;
      return searchManager.promiseSearchMedias(params);
    }).then(function (result) {
      siteParams.content = result;
      callback(null, siteParams);
    }).catch(function (error) {
      debug('Caught error', error);
      callback(error);
    }).done();
  };

  SearchManager.prototype.decodeHtmlEntities = function(obj){
    if (!obj){
      return obj;
    } else if (Array.isArray(obj)){
      return obj.map(this.decodeHtmlEntities.bind(this));
    } else if (typeof obj === 'object'){
      for (var key in obj){
        if (obj.hasOwnProperty(key)){
          obj[key] = this.decodeHtmlEntities(obj[key]);
        }
      }
      return obj;
    } else if (typeof obj === 'string'){
      return this.entities.decode(obj);
    }
    return obj;
  };

  SearchManager.prototype.getFacets = function(params={}){
    var facets = facetsForSite(params.source || params.site);
    if (!params.facets){
      return facets; 
    }
    var finalFacets = {};
    for(var f of params.facets){
      let facet = facets[f];
      if (facets[f]){
        finalFacets[f] = facets[f];
      }
    }
    return finalFacets;
  };

  SearchManager.prototype.getAggregators = function(params){
    if (params.noFacets){
      return undefined;
    }
    var aggs = {};
    _.forEach(this.getFacets(params), function(facet, key) {
      if (facet.search_type) {
        aggs[key] = facet.search_type;
      } else {
        var field = key;
        if (facet.untouched) field = key + ".untouched";
        if (facet.raw) field = key + ".raw";
        aggs[key] = {
          terms: {
            field: field,
            size: params.facetLimit || 15
          }
        }
      }
    });
    return aggs;
  };

  SearchManager.prototype.nextDate = function(dateString){
    var pad = function(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    var matches = dateString.match(/^([0-9]+)$/);
    if (matches){
      var year = Number(matches[1]);
      return pad(year+1, 4);
    }
    var matches = dateString.match(/([0-9]+)-([0-9]+)/);
    var year = matches[1];
    var month = matches[2];
    month++;
    if (month > 12){
      year++;
      month = 1;
    }
    return pad(year, 4) + '-' + pad(month, 2);
  };

  SearchManager.prototype.computeFacets = function(aggregations, params){
    if (params.noFacets) return undefined;

    // Ensures desired order
    var facets = {};
    var sourceFacets = this.getFacets(params);
    for(var key in sourceFacets){
      if (sourceFacets.hasOwnProperty(key)){
        var agg = aggregations[key];
        var facet = sourceFacets[key];
        if (agg){
          facets[key] = {
            ...agg,
            icon: facet.icon || "search",
            type: facet.type,
            label: facet.label
          }
        }
      }
    }
    return facets;
  };

  SearchManager.prototype.getPath = function(params){
    const config = configs[params.source || params.site];
    return config.path;
  };

  SearchManager.prototype.computeSort = function(config, params){
    if (!params.sort) return undefined;
    return config.sort[params.sort];
  };

  SearchManager.prototype.computeSelect = function(config, params){
    if (params.select) return params.select;
    else if (!config.select) return undefined; 
    else if (params.selectExtra) return [...config.select, ...params.selectExtra];
    else return config.select;
  };

  SearchManager.prototype.getAsyncOptions = function(op, params){
    const path = this.getPath(params);

    return {
      host: params.site == 'psa' ? 'localhost' : this.es.host, // Lock PSA on localhost
      path: path + '/' + op + '?pretty=true',
      port: this.es.port,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  };

  /*
   * Fetch ids using same parameters as search (path and select)
   */
  SearchManager.prototype.getDocuments = function(ids, params={}){
    if (ids.length == 0){
      return {
        results: []
      };
    }
    const config = configs[params.source || params.site];
    const select = this.computeSelect(config, params);
    const options = this.getAsyncOptions('_mget', params);
    var postData = {
      "docs": ids.map(id => ({
        _id: id,
        _source: select
      }))
    };
    return async.makePromise(options, postData).then(function(result){
      var results = searchManager.decodeHtmlEntities(result.docs);

      return {
        results: results.map(res => res._source)
      };
    });
  }

  SearchManager.prototype.promiseSearchMedias = function(params){
    if (OFFLINE_MODE){
      var deferred = Q.defer();
      deferred.resolve({
        query: params.q,
        limit: params.limit,
                source: params.source, // michelin ? :p
                filters: [],
                results: {
                  hits: []
                },
                facets: {}
              });
      return deferred.promise;
    }
    var query;// = params.q || "*";
    var path = this.getPath(params);
    const config = configs[params.source || params.site];
    if (params.q){
      query = {
        query_string: {
          default_operator: "AND",
          query: params.q
        }
      };
    } else {
      query = {
        match_all:{}
      };
    }

    // Compute query filters
    const defaultFilters = config.filters || [];
    const userFilters = params.filters || [];
    const filters = [...defaultFilters, ...userFilters];
    debug('filters', filters);
    if (filters.length > 0){
      // Add filters
      var esFilters = [];

      var facets = facetsForSite(params.source || params.site);
      var keyOf = function(filter){
        for (var key in filter) {
          return key;
        }
        return undefined;
      };
      filters.forEach(function(f){
        var key = keyOf(f);
        var value = f[key];
        var facet = facets[key];
        console.log("DeTECTION FAcette");
        console.log("valeur",value);
         console.log("facette",facet);
        
        if (!facet){
          debug('unknown facet', key, facets);
          return;
        }

        var field = key;
        if (facet.untouched) field = key + ".untouched";
        if (facet.raw) field = key + ".raw";
        if (facet.type === "date"){
          var range = {};
          range[field] = {
            gte: value,
            lt: this.nextDate(value),
            format: "yyyy-MM || yyyy"
          };
          esFilters.push({range: range});
        } else {
          var term = {};
          term[field] = value;
          esFilters.push({term: term});
        }
      }.bind(this));

      var filter;
      if (esFilters.length == 1){
        filter = esFilters[0];
      } else {
        filter = {
          "and": esFilters
        }
      }
      // Build filters query
      query = {
        filtered: {
          query: query,
          filter: filter
        }
      };
    }
    // debug('query', JSON.stringify(query));

    const select = this.computeSelect(config, params);
    const options = this.getAsyncOptions('_search', params);

    var postData = {
      from: params.offset,
      size: params.limit,
      sort: this.computeSort(config, params),
      //explain: true, // Explain query score
      query: query,
      _source: select,
      aggs: this.getAggregators(params),
      "highlight" : {
        "order" : "score",
        "pre_tags" : ["<strong>"],
        "post_tags" : ["</strong>"],
        "fields" : {
          "*" : {"fragment_size" : 40, "number_of_fragments" : 2}
        }
      }
    };
  // debug(JSON.stringify(postData, null, 2));
  return async.makePromise(options, postData).then(function(result){
    var results = searchManager.decodeHtmlEntities(result.hits);
    results.hits = _.forEach(results.hits, function(hit){
      // Reinline source field if needed
      if (hit.fields && hit.fields.source){
        _.assign(hit, {
          _source: hit.fields.source[0],
          fields: undefined
        });
      } 
    });
    var next;
    var offset = Number(params.offset) || 0;
    if (offset + results.hits.length < results.total){
      var nextParams = {
        q: params.q,
        filters: JSON.stringify(userFilters),
        offset: offset + results.hits.length,
        limit: params.limit
      };
      var extraSource = '';
      if (params.source) extraSource = '/' + params.source;
      next = '/' + params.site + '/api/search' + extraSource + '?' + querystring.stringify(nextParams);
    }
    return {
      query: params.q,
      limit: params.limit,
      source: params.source, // michelin ? :p
      filters: userFilters,
      select: params.select,
      selectExtra: params.selectExtra,
      results: results,
      facets: searchManager.computeFacets(result.aggregations, params),
      next: next
    };
  });
};

SearchManager.prototype.promiseSearchFacets = function(facets, params){
  var params = {...params} || {};
  params.facetLimit = params.limit || 1000;
  params.limit = 0;
  params.facets = facets;
  return this.promiseSearchMedias(params)
  .then(function(data){
    return {
      query: data.query,
      filters: data.filters,
      facets: data.facets
    };
  });
};

SearchManager.prototype.promiseMediaTagCloud = function(params){
  var query = params.query || "*";
  var options = {
    host: 'armadillolab.fr',
    path: 'campusaar/medias/_search',
    port: 9200,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  var postData = {
    "from": params.offset,
    "size": params.limit,
    "query": {
      "query_string": {
        "default_operator": "AND",
        "query": query
      }
    },
    "aggs": this.getAggregators(params)
  };
  return async.makePromise(options, postData).then(function(result){
    var results = searchManager.decodeHtmlEntities(result.hits);
    var next;
    var offset = Number(params.offset) || 0;
    if (offset + results.hits.length < results.total){
      var nextParams = {
        q: params.q,
        filters: params.filters,
        offset: offset + results.hits.length,
        limit: params.limit
      };
      next = '/' + params.site + '/api/medias?' + querystring.stringify(nextParams);
    }
    return {
      query: params.q,
      filters: filters,
      results: results,
      facets: result.aggregations,
      next: next
    };
  });
};


return new SearchManager(config.all());
})();

module.exports = searchManager;