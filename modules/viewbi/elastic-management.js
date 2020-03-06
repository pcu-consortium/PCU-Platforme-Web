'use strict';

var debug = require('debug')('pcu:cms:api-router');
var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');



var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
//just a database test






module.exports = client;
