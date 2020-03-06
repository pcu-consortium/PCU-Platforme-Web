'use strict';

var debug = require('debug')('arma:campusaar:query');

var mongoose = require('mongoose');


var querySchema = new mongoose.Schema({
        id: String,
        name: String,
        description: String,
        index: String,
        parameters : String,
        query: String,
        max_rows: Number,
        max_aggs: Number,
        max_timeout: Number,
        config_select: String,
        config_where: String,
        config_groupby: String,
        config_orderby: String
    });

var  Query = mongoose.model('query',querySchema ) ;

module.exports = Query;