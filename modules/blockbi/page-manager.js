'use strict';
var debug = require('debug')('arma:pcu:elastic:api-router');
var express = require('express');
var mongoose = require('mongoose');
var router = require('express').Router();

var Page= require('./page.js');
var pageSchema=require('mongoose').model('page').schema;
/*********************************************************************************************/
// ROUTER mongodb
/*********************************************************************************************/

// put query
router.put('/pagebi',function (req, res) {
  var page=  new Page(req.body);
  page.save(function(err,result) {
    if (err)
       res.send(err);
    else {
       return res.send(result);
       }
    });
});

//delete query by id
router.delete('/pagebi/:id', function (req, res){
  Page.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      return res.send("La page a été supprimée.");
      }
    else {
      return console.log(err);
      }
  });
});

//get query by id
router.get('/pagebi/:id', function (req, res){
    Page.findById(req.params.id, function (err, query) {
    if (!err) {
      return res.send(query);
    } else {
      return console.log(err);
    }
  });
});

//get query list by index, type
router.get('/pagebiList/:title', function (req, res){
  var title=req.params.title;
  Page.find({}, function(err, queries) {
    
    var queryList = [];
    queries.forEach(function(query) {
      console.log("query",query);
      queryList.push(query);
      });
    if (!err) {
      return res.send(queryList);
      }
    else {
      return console.log(err);
      }
  });
});


module.exports = router;