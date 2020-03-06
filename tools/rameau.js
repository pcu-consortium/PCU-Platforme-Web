var fs = require('fs');
var xml2js = require('xml2js');
var _ = require('lodash');
var async = require('../modules/async');
var config = require('../modules/config');


var args = process.argv.slice(2);
console.log('Files to import: ' + args.join(', '));


var sendBulkToES = function(index, type, bulkData, callback){
    if (bulkData.length == 0){
        callback(null, null); // Nothing to do
        return;
    }
    var options = {
        //host: 'armadillolab.fr',
        host: config.es.host,
        path: '/' + index + '/' + type + '/_bulk',
        port: config.es.port,
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

var importFiles = function(files){
    if (files.length == 0){
        return;
    }
    var filepath = files.splice(0, 1)[0];
    console.log(filepath);
    var tags = 0;

    var terms = [];

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
                default: break;
            }
        }
    });
    saxStream.on("closetag", function (node) {
        // same object as above
        if (node == 'rdf:Description'){
            //console.log(current);
            if (current.type == 'http://www.w3.org/2004/02/skos/core#Concept'){
                terms.push(current);
            }
            current = null; // Flush
        }
        textParser = null;
    });
    saxStream.on("end", function(){
        console.log('found ' + terms.length + ' terms');
        //console.log(terms[0]);
        sendBulkToES('rameau', 'concepts', terms, function (err, data) {
            console.log('finished');
            showESErrors(data);
            importFiles(files);
        });
    });
// pipe is supported, and it's readable/writable
// same chunks coming in also go out.
    fs.createReadStream(filepath)
        .pipe(saxStream);

    //var parser = new xml2js.Parser();
    //fs.readFile(filepath, function(err, data) {
    //    parser.parseString(data, function (err, result) {
    //        console.log('parsing ok');
    //        var entries = result['rdf:RDF']['rdf:Description'];
    //        console.log('found ' + entries.length + ' entries');
    //        var xmlTerms = entries.filter(function(e){
    //            return e['skos:prefLabel']
    //        });
    //        console.log('found ' + entries.length + ' terms, processing...');
    //        var terms = xmlTerms.map(function(t){
    //            return {
    //                id: t.$['rdf:about'],
    //                prefLabel: t['skos:prefLabel'][0]._,
    //                altLabel: map(t['skos:altLabel'], function(l){return l._}),
    //                type: resourceList(t['rdf:type']),
    //                related: resourceList(t['skos:related']),
    //                seeAlso: resourceList(t['rdfs:seeAlso']),
    //                closeMatch: resourceList(t['skos:closeMatch']),
    //                broader: resourceList(t['skos:broader'])
    //                narrower: resourceList(t['skos:narrower'])
    //            }
    //        });
    //        //terms.forEach(function(t){
    //        //    console.log(t['skos:prefLabel']);
    //        //});
    //        //console.dir(terms);
    //        //console.log(JSON.stringify(xmlTerms[0], null, 2));n
    //        //console.log(JSON.stringify(terms[0], null, 2));
    //        console.log(terms.length + ' terms');
    //        importFiles(files); // Continuation
    //    });
    //});
};

importFiles(args);
