var debug = require('debug')('arma:db');
var config = require('./config').all();
var mongo = require('mongoskin');


var db = mongo.db(config.db.url, {native_parser:true});
db.bind('cms_menu');
db.bind('cms_page');
db.bind('tmp');

exports.db = db;
debug('Bound to database with url "' + config.db.url + '".');
