
var fs = require('fs');
var path = require('path');
var Q = require('q');
var geocoder = require('geocoder');

var localFile = path.join(__dirname, './geocache.json'); // read-only
var cacheFile = path.join(__dirname, '../../../../files/geocache.json'); // read-write

// Load at startup
const AUTO_LOAD_CACHE = true;
var geocodeCache = {};
var localCache = {}, fileCache = {}; // Local (read-only) and read-write caches
var invalidCache = {}; // Cache for invalid entries

var isLocked = false;
var isDirty = false;

var lockFile = function(){
  isDirty = false;
  isLocked = true;
}

var unlockFile = function(){
  isLocked = false;
  if (isDirty){
    writeCache();
  }
}

function loadCache(file){
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch(e){
    console.log(e);
    return {};
  }
}

if (AUTO_LOAD_CACHE){
  localCache = loadCache(localFile);
  fileCache = loadCache(cacheFile);
  geocodeCache = {...localCache, ...fileCache};
}

/*
 * Write geocode cache to file for later use
 */
var writeCache = function(cb){
  // if (isLocked){
  //   isDirty = true;
  // } else {
  //   lockFile();
  try{
    console.log('write', cacheFile);
    fs.writeFileSync(cacheFile, JSON.stringify(fileCache, null, 2));//, function(err) {
  } catch(e){
    console.log(e);
  }
    //   if(err) {
    //       return console.log(err);
    //   }
    //   console.log("The file was saved!");
    //   unlockFile();
    // }); 
  // }
};

async function mapAsync(array, fun){
  var newArray = [];
  for(var i=0; i<array.length; i++){
    let value = await fun(array[i]);
    newArray.push(value);
  }
  return newArray;
}

function sanitizeLocation(location){
  // Lowercase and remove "cedex" (doesn't work in Google's geocoder)
  return location.toLowerCase().replace(/\s*cedex\s+[0-9]+\s*/g, ' ').trim();
}


var geocode = function(location, callback, retryCount=0){
  var key = sanitizeLocation(location);

  if (key in geocodeCache){
    // console.log('CACHE', location);
    callback(null, {
      name: location,
      location: geocodeCache[key]
    });
  } else if (key in invalidCache){
    callback(invalidCache[key], {
      name: location
    });
  } else {
    // console.log('QUERY', location);
    geocoder.geocode(key, (err, res) => {
      if (err) callback(err);
      else {
        if (res.status === 'OK'){
          geocodeCache[key] = res.results[0].geometry.location;
          fileCache[key] = geocodeCache[key];
          writeCache();
          callback(null, {
            name: location,
            location: geocodeCache[key]
          });
        } else if ((res.status === 'OVER_QUERY_LIMIT') && (retryCount < 2)){
          // Wait 1 second before retrying...
          setTimeout(() => {
            geocode(location, callback, retryCount+1);
          }, 1000);
        } else {
          console.log(location, 'AS', key, res);
          invalidCache[key] = res.error_message;
          callback(res.error_message, {
            name: location
          });
        }
      }
    });
  }
};

var asyncGeocode = function(location){
  return new Promise((resolve, reject) => {
    geocode(location, (err, res) => {
      resolve(res); // Ignore errors for now
    });
  });
};

async function asyncGeocodes(locations){
  // We'll map them sequentially in case we have duplicates that could hit the cache
  return await mapAsync(locations, asyncGeocode);
}

function geocodes(locations, callback){
  (async function(){
    callback(null, await asyncGeocodes(locations));
  }());
}

module.exports = {
  geocode,
  geocodes,
  asyncGeocode,
  asyncGeocodes
}