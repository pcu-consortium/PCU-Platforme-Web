var path = require('path');
var fs = require('fs');
var unzip = require('unzip');
//var csv   = require('ya-csv')
var _ = require('lodash');
//var Converter = require("csvtojson").core.Converter;
//console.log(require("csvtojson"));
var csv = require('csv');
var async = require('../modules/async');

var iconv = require('iconv-lite');

var ES_INDEX = 'psa';
var DELIMITER = "\t";
var ROW_DELIMITER = "\r\n";
var BULK_SIZE = 2000;

var args = process.argv.slice(2);
console.log('Files to import: ' + args.join(', '));


var esOptions = function(method, path){
    return {
        //host: 'armadillolab.fr',
        host: 'localhost',
        path: path,
        port: 9200,
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

var armaVal = function(val){
    if ((typeof val) === "string" && (val.indexOf('~~') == 0)){
        var matches = val.match(/~~[^:]+:[^~]*/g);
        if (!matches){
            return val;
        }
        var obj = {};
        for(var match of matches){
            var kv = match.match(/~~([^:]+):([^~]*)/);
            obj[kv[1]] = kv[2];
        }
        return obj;
    }
    return val;
}

var armaType = function(type){
    switch(type){
        case "BOOLEAN": return {type: "boolean"};
        case "CHAR":    return {type: "text"};
        case "INTEGER": return {type: "number", subtype: "integer"};
        case "DECIMAL": return {type: "number", subtype: "float"};
        case "DATE":    return {type: "date", subtype: "date"};
        case "TIMESTAMP":    return {type: "date", subtype: "datetime"};
        case "TIME":         return {type: "date", subtype: "time"};
        case "PSEUDODATE":   return {type: "date", subtype: "date"};
        default: console.log('unhandled type', type); return {type: "text"};
    }
};

var multivalued = function(list_type){
    if (!list_type) return false;
    switch(list_type){
        case "LISTE SIMPLE": return true;
        case "THESAURUS":    return true;
        case "LISTE ANNEXE": return true;
        default: return false;
    }
};

var computeTabs = function(table){
    var tabs = [];
    var tableMap = {};
    table.fields.forEach(function(field){
        var id = 1+Math.floor(field.pos/100);
        var label = "Onglet " + id;
        if (!(id in tableMap)){
            tableMap[id] = {
                id: id,
                label: label,
                fields: []
            };
            tabs.push(tableMap[id]);
        }
        var tab = tableMap[id];
        if (field.id !== 'commentaires') tab.fields.push(field.id);
    });
    return tabs;
}

var makeArmaTables = function(columns, callback){
    var tables = {};
    var tableNames = [];
    columns.forEach(function(column){
        var id = column.id;
        if (!(id in tables)){
            var label = column.label || id;
            var table = {id:id, label:label, fields:[]};
            tables[id] = table;
            // console.log('TABLE', label);
            tableNames.push(label);
        }
        var type = armaType(column.field_type);
        var isMultiValued = multivalued(column.list_type);
        // if (multiValued) console.log(column.field_id, column.field_label);
        tables[id].fields.push({
            id: column.field_id,
            label: column.field_label,
            type: type.type,
            subtype: type.subtype,
            multivalued: isMultiValued,
            pos: parseInt(column.pos, 10)
        });
    });
    for(var id in tables){
        if (tables.hasOwnProperty(id)){
            var table = tables[id];
            table.tabs = computeTabs(table);
        }
    }
    console.log('TABLES:', tableNames.join(', '));
    return tables;
};

var makeObject = function(header, line, fields){
    var len = Math.min(line.length, header.length);
    var obj = {};
    for(var i=0; i<len; i++){
        var value = line[i];
        if (value !== ""){
            var key = header[i];
            obj[key] = armaVal(value);
            if (fields && fields[key].multivalued){
                obj[key] = obj[key].split(" ; ");
                // console.log(obj[key]);
            }
        }
    }
    return obj;
};

var esType = function(field){
    switch(field.type){
        case "boolean": return { type: "boolean" };
        case "number": //return { type: field.subtype };
        case "date": if ((field.id == "date_exacte") || (field.id == "cdate") || (field.id == "mdate")) {
            return {
                type: "date",
                format: "dd/MM/yyyy"
            };
        } else {
            return {
                type: "string",
                fields: {
                    "raw":   { "type": "string", "index": "not_analyzed" }
                }
            };
        }
        case "text": 
        default: return {
            type: "string",
            fields: {
                "raw":   { "type": "string", "index": "not_analyzed" }
            }
        };
    }
};

var initMapping = function(index, table, callback){
    async.makePromise(esOptions('PUT', '/' + index)).nodeify(function(){
        var tableName = table.id.toLowerCase();
        var options = esOptions('PUT', '/' + index + '/_mapping/' + tableName);
        var properties = {};
        var mapping = {
        };
        table.fields.forEach(function(field){
            properties[field.id] = esType(field);
        });
        mapping[tableName] = { properties: properties };
        console.log(JSON.stringify(mapping, null, 2));

        // var postData = _.map(bulk, JSON.stringify).join("\n");
        async.makePromise(options, mapping).nodeify(callback);
    });
};

var sendBulkToES = function(index, type, bulkData, callback){
    if (bulkData.length == 0){
        callback(null, null); // Nothing to do
        return;
    }
    var options = esOptions('POST', '/' + index + '/' + type.toLowerCase() + '/_bulk');
    var bulk = [];
    _.forEach(bulkData, function(obj){
        bulk.push({"index":{"_id":obj.docid}});
        bulk.push(obj);
    });
    console.log('send', bulkData.length);
    var postData = _.map(bulk, JSON.stringify).join("\n");
    async.makePromise(options, postData).nodeify(callback);
};

var showESErrors = function(data) {
    if (data && data.errors && data.items) {
        var errors = _.filter(data.items, function (item) {
            return item.index.status != 200;
        });//.forEach(console.log);
        console.log(errors);
    }
};

var importFiles = function(files, tables){
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

        var table = tables[name];
        var fields = {};
        table.fields.forEach(function(field){
            fields[field.id] = field;
        });

        // Push table to ES...
        initMapping(ES_INDEX, table, function(err, res){
            if (err) console.log(err);
            else console.log(res);
            // console.log('table', table);
            //var converter = new Converter({constructResult:true, delimiter: ';'});
            //converter.on("end_parsed", function (jsonObj) {
            //    console.log(jsonObj); //here is your result json object
            //});
            //entry.pipe(converter);
            var bulk = [];
            var parser = csv.parse({
                delimiter: DELIMITER,
                rowDelimiter: ROW_DELIMITER,
                skip_empty_lines: true,
                relax: true
                //columns: true // autodiscover
                //auto_parse: true
            });

            var cnt = 0;
            // Read header once
            parser.once('data', function(data){
                var header = data;
                // Read labels once (skip)
                parser.once('data', function(data){
                    var labels = data;
                    parser.addListener('data', function(data){
                        var obj = makeObject(header, data, fields);
                        obj.base = name;
                        // console.log(obj.date_exacte, obj.cdate);
                        //if (bulk.length === 0){
                        //    console.log(obj);
                        //}
                        // if (bulk.length > 10){
                        //    process.exit(0);
                        // }
                        bulk.push(obj);
                        // Batch by 100
                        if (bulk.length >= BULK_SIZE) {
                            parser.pause();
                            sendBulkToES(ES_INDEX, name, bulk, function (err, data) {
                                cnt += bulk.length;
                                console.log('batch ok', cnt);
                                showESErrors(data);
                                bulk = []; // Flush
                                parser.resume();
                            });
                        }
                    });
                });
            });

            parser.addListener('end', function(data){
                console.log('add remaining data');
                sendBulkToES(ES_INDEX, name, bulk, function (err, data) {
                    console.log('finished');
                    showESErrors(data);
                });
                entry.autodrain();
                importFiles(files, tables); // Import remaining files...
            });

            var converterStream = iconv.decodeStream('iso-8859-15');
            entry.pipe(converterStream).pipe(parser);            
        });
    });
};

var columnParser = csv.parse(
    {
        delimiter: DELIMITER,
        rowDelimiter: ROW_DELIMITER,
        skip_empty_lines: true,
        relax: true
    }, function(err, data){
        var header = data.shift();
        // console.log('header', header);
        var columns = data.map(function(line){return makeObject(header, line);});
        // console.log(header, columns);
        var tables = makeArmaTables(columns);
        // console.log(JSON.stringify(tables, null, 2));
        importFiles(args, tables);
    }
);

fs.createReadStream('./data/columns.csv').pipe(columnParser);

//
//for(var i=0; i<args.length; i++){
//    var filepath = args[i];
//    console.log(filepath);
//
//}

