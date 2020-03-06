var debug = require('debug')('arma:pcu:pagebi');
var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
  creationdate: Date,
  creator: String,
  description: String,
   title: String,
  blocks:[{type: mongoose.Schema.Types.ObjectId, ref: 'block'}]
 
});

var Page = mongoose.model('page', PageSchema);
module.exports = Page;