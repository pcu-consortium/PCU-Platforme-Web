'use strict';

var debug = require('debug')('arma:campusaar:profile');

var mongoose = require('mongoose');


var TaskSchema = new mongoose.Schema({
    taskname: String,
    description: String
});

var  Task = mongoose.model('Task',TaskSchema ) ;

module.exports = Task;