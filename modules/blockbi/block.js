var debug = require('debug')('arma:pcu:blockbi');
var mongoose = require('mongoose');

var BlockSchema = new mongoose.Schema({
  creationdate: Date,
  creator: String,
  description: String,
  esquery: String,
  title: String,
  entities:[{type: mongoose.Schema.Types.ObjectId, ref: 'entity'}]
 
});

var Block = mongoose.model('block', BlockSchema);
module.exports = Block;