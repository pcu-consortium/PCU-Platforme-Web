'use strict';

var debug = require('debug')('arma:campusaar:query');

var mongoose = require('mongoose');


var querySchema = new mongoose.Schema({
    id: String,
    config: String,
    content: String,
    description: String,
    name: String,
    type: String,
    response: String,
    esquery: String
});

var  Query = mongoose.model('query',querySchema ) ;

module.exports = Query;