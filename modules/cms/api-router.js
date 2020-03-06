'use strict';

var debug = require('debug')('arma:cms:api-router');
var express = require('express');

var router = express.Router();

var db = require('../db').db;

var apiUtils = require('../../utils/api-utils.js');

//just a databse test



/**
 * CMS Menu routes
 */
router.get('/cms/menu', function(req, res){
    db.cms_menu.findById(req.site, apiUtils.processFindOne(res));
    debug('tttttttttttttttttttttttttttttttttttttttttttttttttttttt');
});
router.put('/cms/menu', function(req, res){
    debug('tttttttttttttttttttttttttttttttttttttttttttttttttttttt');
    db.cms_menu.updateById(req.site, {$set:req.body}, {upsert: true}, apiUtils.processUpdate(res));
});


/**
 * CMS Page routes
 */
router.get('/cms/page/:pageId', function(req, res){
    db.cms_page.findById(req.site + '.' + req.params.pageId, apiUtils.processFindOne(res));
});
router.put('/cms/page/:pageId', function(req, res){
    var page = req.body;
    page.site = req.site;
    page.pageId = req.params.pageId;
    db.cms_page.updateById(page.site + '.' + page.pageId, {$set:page}, {upsert: true}, apiUtils.processUpdate(res));
    
});

router.delete('/cms/page/:pageId', function(req, res){
    var page = req.body;
    debug('Mongo id',page.site + '.' + page.pageId);
    db.cms_page.removeById(page.site + '.' + page.pageId, function(err, result) {});
});

router.get('/cms/allpage', function(req, res){
	var siteid=req.site;//req.params.siteId;
	db.cms_page.find({'site':siteid},{'pageId':1,_id: 0}).toArray(function(err, result) {
    	res.send(result);
	});
});
///Specific to inscription

router.get('/cms/inscription', function(req, res){
   var siteId=req.site;
   var id=siteId+ '.' + 'Inscription';
   debug("Page",id);
  
 var page= {
            type: 'Page',
            title: 'Inscription',
            site:  siteId,
            pageId: id,
            showTOC: false,
            children: [
                {
                    type: 'AccountSignup'
                }
            ]
        };

 
    db.cms_page.updateById(id, {$set:page}, {upsert: true}, apiUtils.processUpdate(res));


});

//CMS
router.get('/cms/admin', function(req, res){
   var siteId=req.site;
   var id=siteId+ '.' + 'Admin';
     
 var page= {
            type: 'Page',
            title: 'Administration',
            site:  siteId,
            pageId: id,
            showTOC: false,
            children: [
                {
                    type: 'AdminInterface'
                }
            ]
        };

 
    db.cms_page.updateById(id, {$set:page}, {upsert: true}, apiUtils.processUpdate(res));


});


















module.exports = router;

