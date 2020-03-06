var fs = require('fs');
var xml2js = require('xml2js');
var _ = require('lodash');
var async = require('../modules/async');


var args = process.argv.slice(2);

var fileNumber = function(filename){
    var matches = filename.match(/([0-9]+)\.xml$/);
    if (matches){
        //console.log(matches);
        return parseInt(matches[1], 10);
    }
    return 0;
};

// Sort...
args = args.sort(function(f1, f2){
    return fileNumber(f1) - fileNumber(f2);
});

console.log('Files to import: ' + args.join(', '));

var rameauType = "periodic";


var sendBulkToES = function(index, type, bulkData, callback){
    if (bulkData.length == 0){
        callback(null, null); // Nothing to do
        return;
    }
    var options = {
        //host: 'armadillolab.fr',
        host: 'localhost',
        path: '/' + index + '/' + type + '/_bulk',
        port: 9200,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var bulk = [];
    _.forEach(bulkData, function(obj){
        bulk.push({"index":{"_id":obj.id}});
        bulk.push(obj);
    });
    console.log('send', bulkData.length);
    var postData = _.map(bulk, JSON.stringify).join("\n");
    return async.makePromise(options, postData).nodeify(callback);
};

var showESErrors = function(data) {
    if (data && data.errors && data.items) {
        var errors = _.filter(data.items, function (item) {
            return item.index.status != 200;
        });//.forEach(console.log);
        console.log(errors);
    }
};

var resourceList = function(xmlList){
    if (!xmlList){
        return undefined;
    }
    return xmlList.map(function(r){return {id: r['$']["rdf:resource"]}});
};

var map = function(arr, f){
    if (!arr){
        return arr;
    }
    return arr.map(f);
};

var pendingTerms = {};
var totalSent = {};

var importFiles = function(files){
    if (files.length == 0){
        console.log('Total sent', totalSent);
        return;
    }
    var filepath = files.splice(0, 1)[0];
    console.log(filepath);
    var tags = 0;

    var terms = [];
    var concepts = [];
    var works = [];

    var current = undefined;
    var textParser;
    var pushResource = function(key, node){
        if (!current[key]){
            current[key] = [];
        }
        current[key].push({id:node.attributes['rdf:resource']});
    };

    var saxStream = require("sax").createStream(true, {});
    saxStream.on("error", function (e) {
        // unhandled errors will throw, since this is a proper node
        // event emitter.
        console.error("error!", e)
        // clear the error
        this._parser.error = null;
        this._parser.resume()
    });
    saxStream.on("text", function (t) {
        // got some text.  t is the string of text.
        if (textParser){
            textParser(t);
        }
    });
    saxStream.on("opentag", function (node) {
        // same object as above
        if (node.name == 'rdf:Description'){

            current = {
                id: node.attributes['rdf:about']
            };
        } else if (current){
            switch(node.name){
                case 'skos:prefLabel': textParser = function(t){current.prefLabel = t;}; break;
                case 'skos:altLabel': textParser = function(t){
                    if (!current.altLabel) current.altLabel = [];
                    current.altLabel.push(t);
                }; break;
                case 'rdf:type': current.type = node.attributes['rdf:resource']; break;
                case 'skos:related': pushResource('related', node); break;
                case 'skos:seeAlso': pushResource('seeAlso', node); break;
                case 'skos:closeMatch': pushResource('closeMatch', node); break;
                case 'skos:broader': pushResource('broader', node); break;
                case 'skos:narrower': pushResource('narrower', node); break;
                case 'foaf:focus': pushResource('foaf:focus', node); break;
                default: textParser = function(t){
                    if (!current[node.name]) current[node.name]= [];
                    current[node.name].push(t);
                };break;
            }
        }
    });
    saxStream.on("closetag", function (node) {
        // same object as above
        if ((node == 'rdf:Description') && current.type){
            //console.log(current);
            if (current.type.indexOf('http://www.w3.org/2004/02/skos/core#Concept') != -1){
                concepts.push(current);
                //console.log(current);
                //if (current['foaf:focus']){
                //    pendingTerms[current['foaf:focus'][0].id] = current;
                //}
                //terms.push(current);
            }
            // else if (current.id in pendingTerms){
            //    var skos = pendingTerms[current.id];
            //    delete pendingTerms[current.id];
            //    for(var key in skos){
            //        if (skos.hasOwnProperty(key) && (key != "type")){
            //            current[key] = skos[key];
            //        }
            //    }
            //    current._type = rameauType;
            //    terms.push(current);
            else if (current.type.indexOf("http://rdvocab.info/uri/schema/FRBRentitiesRDA/Work") != -1) {
                works.push(current);
            }
            current = null; // Flush
        }
        textParser = null;
    });
    saxStream.on("end", function(){
        //console.log('found ' + terms.length + ' terms');
        //console.log(_.keys(pendingTerms).length + ' pending terms');
        //console.log(pendingTerms);
        console.log('found', concepts.length, works.length);
        //console.log(terms[0]);
        sendBulkToES('rameau', 'concepts', concepts, function (err, data) {
            console.log('finished');
            showESErrors(data);
            sendBulkToES('rameau', 'periodics', works, function (err, data) {
                console.log('finished');
                showESErrors(data);
                importFiles(files);
            });
        });
    });
// pipe is supported, and it's readable/writable
// same chunks coming in also go out.
    fs.createReadStream(filepath)
        .pipe(saxStream);

};

importFiles(args);
