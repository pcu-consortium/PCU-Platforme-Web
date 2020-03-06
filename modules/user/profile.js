'use strict';

var debug = require('debug')('arma:campusaar:profile');

var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
  profilename: { type: String },
  description: String,
  tache:[{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
  portail: { type: String, required: true, enum: ['AGORA', 'AHM', 'ARC', 'HAL'] },
  profileid:Number 
});

var Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;