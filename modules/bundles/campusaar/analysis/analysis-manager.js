'use strict';

var debug = require('debug')('arma:campusaar:analysis:manager');

var async = require('../../../async');
var config = require('../../../config').all();

var _ = require('lodash');
import searchManager from '../../../search/search-manager';
import { asyncGeocodes } from './cached-geocoder';

var HOST = "lab2.armadillo.fr";
//var HOST="37.59.31.215";
var COUNTRY_KEY = "<http://campus-aar.fr/asa#country>";
var CITY_KEY = "<http://campus-aar.fr/asa#city>";

// npm run watch-test-server -- 'modules/bundles/campusaar/analysis/**/*spec.js'

/** 
 * Sequentially geocode entries
 */
async function asyncGeocoding(entries){
  for(var i=0; i<entries.length; i++){
    let entry = entries[i];
    entry.locations = await asyncGeocodes(entry.locations);
  }
  return entries;
}

/*
 * Find locations in graph and append to array
 */
var appendLocations = function(locations, graph){
  if (!graph) return;
  graph.forEach(function(entry){
    if (entry[1] == COUNTRY_KEY){
      var loc = entry[2];
      if (locations.indexOf(loc) == -1){
        locations.push(loc); 
      }
    }
  });
}

/*
 * Remove hard-coded \\n (not even \n)
 * Removes trailing dates (WTF => INALCO Paris, France 2008)
 * Removes unnecessary blank space
 */
function sanitizeLocation(location){
  return location.replace(/\\n/g, ' ').replace(/\s\(?[0-9]{4}\)?\s*$/, '').trim();
}

function cleanSearchResults(searchResults){
  return searchResults.results.hits.map(function(hit){
    var source = hit._source;
    var locations = [];
    // appendLocations(source.graph);
    // TODO : search in segments ??
    if (source.metadata.place){
      // /!\ Can contain multiple locations...
      locations = sanitizeLocation(source.metadata.place).split(';').map(s => s.trim());
    }
    // source.layers.forEach(function(layer){
    //   layer.segments.forEach(function(segment){
    //     appendLocations(locations, segment.graph);
    //   });
    // });
    return {
      ...source, locations
    };
  });
}

async function resolveGeocodingForResults(results){
  let resolvedGeocodingResults = await asyncGeocoding(results);
  // debug(JSON.stringify(resolvedGeocodingResults, null, 2));
  return resolvedGeocodingResults;
}

function fetchGeolocalisedAnalysis(params){
  return searchManager.promiseSearchMedias({
    type: 'analysis',
    site: params.site,
    noFacets: true,
    limit: 1000,
    q: '_exists_:metadata.place',
    selectExtra: ['metadata.place']
  })
  .then(cleanSearchResults)
  .then(resolveGeocodingForResults);
}

module.exports = {
  fetchGeolocalisedAnalysis
};
