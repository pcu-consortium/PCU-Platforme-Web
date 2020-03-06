'use strict';

var debug = require('debug')('arma:campusaar:graphic');

var mongoose = require('mongoose');


var graphicSchema = new mongoose.Schema({
        id: String,
        name: String,
        description: String,
        parameters : String,
        colx: String,
        coly: String,
        index: String,
        query: String
    });

var  Graphic = mongoose.model('graphic',graphicSchema ) ;

module.exports = Graphic;