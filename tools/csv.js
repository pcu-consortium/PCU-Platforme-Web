var path = require('path');
var fs = require('fs');
var unzip = require('unzip');
//var csv   = require('ya-csv')
var _ = require('lodash');
//var Converter = require("csvtojson").core.Converter;
//console.log(require("csvtojson"));
var csv = require('csv');
var async = require('../modules/async');

var args = process.argv.slice(2);
console.log('Files to import: ' + args.join(', '));

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
        bulk.push({"index":{"_id":obj.docid}});
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

var importFiles = function(files){
    if (files.length === 0){
        return;
    }
    var filepath = files.splice(0, 1)[0];
    console.log(filepath);
    fs.createReadStream(filepath)
        .pipe(unzip.Parse())
        .on('entry', function (entry) {
            var filename = entry.path;
            var type = entry.type; // 'Directory' or 'File'
            var size = entry.size;
            var name = path.basename(filename, '.csv');
            console.log(name, filename, type, size);
            //var converter = new Converter({constructResult:true, delimiter: ';'});
            //converter.on("end_parsed", function (jsonObj) {
            //    console.log(jsonObj); //here is your result json object
            //});
            //entry.pipe(converter);
            var bulk = [];
            var parser = csv.parse({
                delimiter: ';',
                skip_empty_lines: true,
                //columns: true // autodiscover
                //auto_parse: true
            });

            var cnt = 0;
            parser.once('data', function(data){
                var header = data;
                parser.addListener('data', function(data){
                    var obj = {base: name};
                    for(var i=0; i<data.length; i++){
                        var value = data[i];
                        if (value !== ""){
                            var key = header[i];
                            obj[key] = value;
                        }
                    }
                    //if (bulk.length === 0){
                    //    console.log(obj);
                    //}
                    bulk.push(obj);
                    // Batch by 100
                    if (bulk.length >= 1000) {
                        parser.pause();
                        sendBulkToES('michelin', name, bulk, function (err, data) {
                            console.log('batch ok');
                            showESErrors(data);
                            bulk = []; // Flush
                            parser.resume();
                        });
                    }
                });
            });

            parser.addListener('end', function(data){
                console.log('add remaining data');
                sendBulkToES('michelin', name, bulk, function (err, data) {
                    console.log('finished');
                    showESErrors(data);
                });
                entry.autodrain();
                importFiles(files); // Import remaining files...
            });

            entry.pipe(parser);
        });
};

importFiles(args);
//
//for(var i=0; i<args.length; i++){
//    var filepath = args[i];
//    console.log(filepath);
//
//}

console.log("ok");