var debug = require('debug')('arma:pcu:elastic:api-router');
var express = require('express');
var mongoose = require('mongoose');
var router = require('express').Router();


var Test= require('./test.js');
var testSchema=require('mongoose').model('test').schema;
// put query
router.put('/test',function (req, res) {
  var query =  new Test(req.body);
  query.save(function(err,result) {
    if (err)
       res.send(err);
    else {
       return res.send(result);
       }
    });
});

//delete query by id
router.delete('/test/:id', function (req, res){
 Test.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      return res.send("test supprimé.");
      }
    else {
      return console.log(err);
      }
  });
});

//get query by id
router.get('/test/:id', function (req, res){
    Test.findById(req.params.id, function (err, query) {
    if (!err) {
      return res.send(query);
    } else {
      return console.log(err);
    }
  });
});
module.exports = router;