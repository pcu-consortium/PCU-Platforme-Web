'use strict';

var debug = require('debug')('arma:campusaar:user:manager');
var user = require('./user.js');
var profile= require('./profile.js');


exports.save = function(req, res) {
  debug('je suis ici');
    new User({username: req.body.name,  userid:req.body.userid,
          password: req.body.password,
          profiles: req.body.profiles,
          birthdate:req.body.birthdate}).save();
          res.send('hello');
};

 

// first locates a thread by title, then locates the replies by thread ID.
/*exports.show = (function(req, res) {
    Thread.findOne({title: req.params.title}, function(error, thread) {
        var posts = Post.find({thread: thread._id}, function(error, posts) {
          res.send([{thread: thread, posts: posts}]);
        });
    })
});*/
//module.exports =  save;