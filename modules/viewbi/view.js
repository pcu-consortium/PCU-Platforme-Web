'use strict';

var debug = require('debug')('arma:campusaar:view');

var mongoose = require('mongoose');

var ViewSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  display : String,
  graphids: String
});

var View = mongoose.model('view', ViewSchema);
module.exports = View;