var debug = require('debug')('arma:pcu:entity');
var mongoose = require('mongoose');

var EntitySchema = new mongoose.Schema({
  type: String,
  metadata: [Schema.Types.Mixed]
});

var Entity = mongoose.model('entity', EntitySchema);
module.exports = Entity;