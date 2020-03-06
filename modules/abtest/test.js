'use strict';

var debug = require('debug')('arma:pcu:test');

var mongoose = require('mongoose');


var testSchema = new mongoose.Schema({
    name: String,
    author: String,
    description: String,
    config: String,
    urls: Array,
    startdate: Date,
    enddate:Date,
    state: String
}),


Test = mongoose.model('test', testSchema);
module.exports =Test;