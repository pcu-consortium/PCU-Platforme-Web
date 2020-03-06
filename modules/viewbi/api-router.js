'use strict';

var debug = require('debug')('arma:pcu:elastic:api-router');
var express = require('express');
var mongoose = require('mongoose');
var router = require('express').Router();
var request = require('request');


var client =require('./elastic-management.js');

var Query= require('./query.js');
var querySchema=require('mongoose').model('query').schema;

var Graphic= require('./graphic.js');
var graphicSchema=require('mongoose').model('graphic').schema;

var View= require('./view.js');
var viewSchema=require('mongoose').model('view').schema;

var esb = require('elastic-builder');

var url_smile_dataset_query_api = "http://3.91.212.162:8092/dataset-query-api";

var url_smile_expansion_phrases_api = "http://3.91.212.162:8094/text_data_enhancement/phrases";
var url_smile_expansion_extract_api = "http://3.91.212.162:8094/text_data_enhancement/tokenize";
var url_smile_expansion_expand_api  = "http://3.91.212.162:8094/text_data_enhancement/expansion";
var url_smile_expansion_docs_api    = "http://3.91.212.162:8092/dataset-query-api/docs";

var url_smile_sentiment_senti_api  = "http://3.91.212.162:8094/text_data_enhancement/sentiment";

var url_arma_reco_api = "http://localhost:5002";

/*********************************************************************************************/
// ROUTER api reco Armadillo
/*********************************************************************************************/

// 10 recommandations pour l'utilisateur <user-id> //

router.get('/reco-query-api-arma/userreco/:methodid/:userid', function (req, res){
  var userid = req.params.userid;
  var methodid = req.params.methodid;

  //var reco_user_prod = JSON.stringify({"recommandations": [[1963584, "0.000680435"], [3764645, "0.0006724547"], [3207346, "0.0006717205"], [3270829, "0.0006712476"], [1977831, "0.0006691045"], [2406484, "0.0006663572"], [3873136, "0.0006657379"], [2477499, "0.00066006475"], [1684705, "0.0006593033"], [3047851, "0.0006589242"]]}); 

  request.get(url_arma_reco_api+'/userreco/'+methodid+'/'+userid,
    (error,res1,json_result) => {
    if (error) {
      console.log(url_arma_reco_api+'/userreco/'+methodid+'/'+userid+" -> error: "+error);
      //return res.send(reco_user_prod);
      }
    else {
      console.log(url_arma_reco_api+'/userreco/'+methodid+'/'+userid+" -> ok");
      console.log('reco_user_prod',JSON.stringify(json_result));
      return res.send(json_result);
      //console.log('reco_user_prod',reco_user_prod);
      //return res.send(reco_user_prod);
      }
    });
  });

  // utilisateur potentiellement intéressé par le produit <product-id> //

  router.get('/reco-query-api-arma/productreco/:methodid/:productid', function (req, res){
    var productid = req.params.productid;
    var methodid = req.params.methodid;
  
    //var reco_prod_user = JSON.stringify({"recommandations": [29206, 19334]}); 
  
    request.get(url_arma_reco_api+'/productreco/'+methodid+'/'+productid,
      (error,res1,json_result) => {
      if (error) {
        console.log(url_arma_reco_api+'/productreco/'+methodid+'/'+productid+" -> error: "+error);
        //return res.send(reco_prod_user);
        }
      else {
        console.log(url_arma_reco_api+'/productreco/'+methodid+'/'+productid+" -> ok");
        console.log('reco_prod_user',JSON.stringify(json_result));
        return res.send(json_result);
        //console.log('reco_prod_user',reco_prod_user);
        //return res.send(reco_prod_user);
        }
      });
    });
  
  // Les 10 utilisateurs les plus similaire a l'utilisateur <user-id> //

  router.get('/reco-query-api-arma/usersim/:methodid/:userid', function (req, res){
    var userid = req.params.userid;
    var methodid = req.params.methodid;
  
    //var reco_user_user = JSON.stringify({"recommandations": [4, 10550, 16471, 58979, 13291, 1328, 39561, 57662, 64446, 54222]}); 
  
    request.get(url_arma_reco_api+'/usersim/'+methodid+'/'+userid,
      (error,res1,json_result) => {
      if (error) {
        console.log(url_arma_reco_api+'/usersim/'+methodid+'/'+userid+" -> error: "+error);
        //return res.send(reco_user_user);
        }
      else {
        console.log(url_arma_reco_api+'/usersim/'+methodid+'/'+userid+" -> ok");
        console.log('reco_user_user',JSON.stringify(json_result));
        return res.send(json_result);
        //console.log('reco_user_user',reco_user_user);
        //return res.send(reco_user_user);
        }
      });
    });
  
  // Les 10 produits les plus similaires au produit <product-id> //

  router.get('/reco-query-api-arma/productsim/:methodid/:productid', function (req, res){
    var productid = req.params.productid;
    var methodid = req.params.methodid;
  
    //var reco_prod_prod = JSON.stringify({"recommandations": [3522817, 3799955, 2504467, 3806142, 1258052, 2831532, 3080132, 3079804, 3204938, 300274]}); 
  
    request.get(url_arma_reco_api+'/productsim/'+methodid+'/'+productid,
      (error,res1,json_result) => {
      if (error) {
        console.log(url_arma_reco_api+'/productsim/'+methodid+'/'+productid+" -> error: "+error);
        //return res.send(reco_prod_prod);
        }
      else {
        console.log(url_arma_reco_api+'/productsim/'+methodid+'/'+productid+" -> ok");
        console.log('reco_prod_prod',JSON.stringify(json_result));
        return res.send(json_result);
        //console.log('reco_prod_prod',reco_prod_prod);
        //return res.send(reco_prod_prod);
        }
      });
    });

/*********************************************************************************************/
// ROUTER api query Smile
/*********************************************************************************************/

// Extraction des phrases //

router.post('/expansion-query-api-arma/phrases', function (req, res){
  var json_query = req.body;

  /*var dataout = JSON.stringify({
    "documents" : [ {
      "id" : "doc-1",
      "keyphrases" : [ "100 photos", "pleines pages", "100 recettes" ]
      }, {
      "id" : "doc-2",
      "keyphrases" : [ "Recettes de cuisine" ]
      } ]
    });*/

  request.post(url_smile_expansion_phrases_api,
    {"json": json_query},
    (error,res1,json_result) => {
    if (error) {
      console.log(url_smile_expansion_phrases_api+" -> error: "+error);
      //return res.send(dataout);
      }
    else {
      console.log(url_smile_expansion_phrases_api+" -> ok");
      console.log('json_result',JSON.stringify(json_result));
      return res.send(json_result);
      //console.log('dataout',dataout);
      //return res.send(dataout);
      }
    });
  });

// Extraction des termes intéressants //

router.post('/expansion-query-api-arma/extraction', function (req, res){
  var json_query = req.body;

  /*var dataout = JSON.stringify({
    "documents" : [ {
      "id" : "doc-1",
      "keyphrases" : [ "100 photos", "pleines pages", "100 recettes" ]
      }, {
      "id" : "doc-2",
      "keyphrases" : [ "Recettes de cuisine" ]
      } ]
    });*/

  request.post(url_smile_expansion_extract_api,
    {"json": json_query},
    (error,res1,json_result) => {
    if (error) {
      console.log(url_smile_expansion_extract_api+" -> error: "+error);
      //return res.send(dataout);
      }
    else {
      console.log(url_smile_expansion_extract_api+" -> ok");
      console.log('json_result',JSON.stringify(json_result));
      return res.send(json_result);
      //console.log('dataout',dataout);
      //return res.send(dataout);
      }
    });
  });

// Expansion des termes intéressants //

router.post('/expansion-query-api-arma/expansion', function (req, res){
  var json_query = req.body;

  /*var dataout = JSON.stringify({
    "results" : [ {
      "terms" : [ "Recettes de cuisine" ],
      "expansion" : [ "recettes détox", "recettes de cocktails", "recettes de pains", "recettes culinaires", "recettes de desserts", "recettes légères", "recettes gourmandes", "recettes vegan", "recettes sucrées" ]
      } ]
    });*/

  request.post(url_smile_expansion_expand_api,
    {"json": json_query},
    (error,res1,json_result) => {
    if (error) {
      console.log(url_smile_expansion_expand_api+" -> error: "+error);
      //return res.send(dataout);
      }
    else {
      console.log(url_smile_expansion_expand_api+" -> ok");
      console.log('json_result',JSON.stringify(json_result));
      return res.send(json_result);
      //console.log('dataout',dataout);
      //return res.send(dataout);
      }
    });
  });

// Documents répondant aux termes intéressants de l'expansion //

router.post('/expansion-query-api-arma/docs', function (req, res){
  var json_query = req.body;

  /*var dataout = JSON.stringify({
    "results" : [ {
      "doc" : [ "3522817" , "3799955", "2504467"]
      } ]
    });*/

  request.post(url_smile_expansion_docs_api,
    {"json": json_query},
    (error,res1,json_result) => {
    if (error) {
      console.log(url_smile_expansion_docs_api+" -> error: "+error);
      //return res.send(dataout);
      }
    else {
      console.log(url_smile_expansion_docs_api+" -> ok");
      console.log('json_result',JSON.stringify(json_result));
      return res.send(json_result);
      //console.log('dataout',dataout);
      //return res.send(dataout);
      }
    });
  });

// Sentiments répondant aux phrases //

router.post('/sentiment-query-api-arma/sentiments', function (req, res){
  var json_query = req.body;

  request.post(url_smile_sentiment_senti_api,
    {"json": json_query},
    (error,res1,json_result) => {
    if (error) {
      console.log(url_smile_sentiment_senti_api+" -> error: "+error);
      //return res.send(dataout);
      }
    else {
      console.log(url_smile_sentiment_senti_api+" -> ok");
      console.log('json_result',JSON.stringify(json_result));
      return res.send(json_result);
      //console.log('dataout',dataout);
      //return res.send(dataout);
      }
    });
  });
    
/*********************************************************************************************/

router.post('/dataset-query-api/query', function (req, res){
  var json_query = req.body;
  request.post(url_smile_dataset_query_api+'/query',
    {"json": json_query},
    (error,res1,json_result) => {
      if (error){
        console.log("dataset-query-api/query -> error: "+error);
        }
    else {
      console.log("dataset-query-api/query -> ok");
      return res.send(json_result);
      }
    });
});

router.post('/dataset-query-api-arma/management1', function (req, res){
  var json_query = req.body;
  request.post(url_smile_dataset_query_api+'/management',
    {"json": json_query},
    (error,res1,json_result) => {
      if (error){
        console.log("dataset-query-api/management -> error: "+error);
        }
    else {
      console.log("searchdataset-query-api/management -> ok");
      return res.send(json_result);
      }
    });
});

// liste des index //

router.post('/dataset-query-api-arma/management/indices/getnames', function (req, res){
  var json_query = JSON.parse('{ "indices": ["*"], "fieldsMapping" : false, "prettyPrint" : true, "health" : false }');
  request.post(url_smile_dataset_query_api+'/management',
    {"json": json_query},
    (error,res1,json_result) => {
      if (error){
        console.log("dataset-query-api/management -> error: "+error);
        }
    else {
      console.log("searchdataset-query-api/management -> ok");
      return res.send(json_result.indices);
      }
    });
});

// liste des colonnes pour un index //

router.post('/dataset-query-api-arma/management/indices/getmapping/:name', function (req, res){
  var json_query = JSON.parse('{ "indices": ["'+req.params.name+'"], "fieldsMapping" : true, "prettyPrint" : true, "health" : false }');
  request.post(url_smile_dataset_query_api+'/management',
    {"json": json_query},
    (error,res1,json_result) => {
      if (error){
        console.log("dataset-query-api/management -> error: "+error);
        }
    else {
      console.log("searchdataset-query-api/management -> ok");
      return res.send(json_result.indices);
      }
    });
});

// management

router.post('/dataset-query-api-arma/management/indices/global/:name', function (req, res){
  var json_query = JSON.parse('{ "indices": ["'+(req.params.name==''? '*' : req.params.name)+'"], "fieldsMapping" : true, "prettyPrint" : true, "health" : true }');
  request.post(url_smile_dataset_query_api+'/management',
    {"json": json_query},
    (error,res1,json_result) => {
      if (error){
        console.log("dataset-query-api/management -> error: "+error);
        }
    else {
      console.log("searchdataset-query-api/management -> ok");
      return res.send(json_result.indices);
      }
    });
});

// Obtenir la liste des noms des indexes sous forme de tableau
router.post('/dataset-query-api-arma/management/indices/name/:name', function (req, res){
  var json_query = JSON.parse('{ "indices": ["'+(req.params.name==''? '*' : req.params.name)+'"], "fieldsMapping" : false, "prettyPrint" : true, "health" : false }');
  request.post(url_smile_dataset_query_api+'/management',
    {"json": json_query},
    (error,res1,json_result) => {
    if (error){
      console.log("/dataset-query-api-arma/management/indices/name/"+req.params.name+" -> error: "+error);
      }
    else {
      console.log("/dataset-query-api-arma/management/indices/name/"+req.params.name+" -> ok");
      var namesMap = [];
      json_result.indices.forEach(function(i) { namesMap.push(i.name); });
      console.log("namesMap=",namesMap);
      return res.send(namesMap); 
      }
  });
});

router.post('/dataset-query-api-arma/management/indices/health/:name', function (req, res){
  var json_query = JSON.parse('{ "indices": ["'+(req.params.name==''? '*' : req.params.name)+'"], "fieldsMapping" : false, "prettyPrint" : true, "health" : true }');
  request.post(url_smile_dataset_query_api+'/management',
    {"json": json_query},
    (error,res1,json_result) => {
      if (error){
        console.log("dataset-query-api/management -> error: "+error);
        }
    else {
      console.log("searchdataset-query-api/management -> ok");
      return res.send(json_result);
      }
    });
});

// Obtenir la liste des nom/type des rubriques pour un indexe sous forme de tableau
router.post('/dataset-query-api-arma/management/indices/mapping/:name', function (req, res){
  var json_query = JSON.parse('{ "indices": ["'+(req.params.name==''? '*' : req.params.name)+'"], "fieldsMapping" : true, "prettyPrint" : true, "health" : false }');
  request.post(url_smile_dataset_query_api+'/management',
    {"json": json_query},
    (error,res1,json_result) => {
      if (error){
        console.log("/dataset-query-api-arma/management/indices/name/"+req.params.name+" -> error: "+error);
        }
      else {
        console.log("/dataset-query-api-arma/management/indices/name/"+req.params.name+" -> ok");
        if (req.params.name) {
          var mappingMap = '';
          json_result.indices.forEach(function(i) { mappingMap=i.fields; });
          console.log("mappingMap=",mappingMap);
          return res.send(mappingMap);
          }
        else
          return res.send(json_result);
      }
    });
});

/*********************************************************************************************/
// ROUTER api mongodb Armadillo
/*********************************************************************************************/

//delete query by id
router.delete('/query/:id', function (req, res){
  Query.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      return res.send("La requête a été supprimée.");
      }
    else {
      return console.log(err);
      }
  });
});

//delete graphic by id
router.delete('/graphic/:id', function (req, res){
  Graphic.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      return res.send("Le graphique a été supprimé.");
      }
    else {
      return console.log(err);
      }
  });
});

//delete view by id
router.delete('/view/:id', function (req, res){
  View.remove({ _id: req.params.id }, function(err) {
    if (!err) {
      return res.send("La vue a été supprimée.");
      }
    else {
      return console.log(err);
      }
  });
});

//get listQueries
router.get('/listQueries', function (req, res){
  Query.find({}, function(err, queries) {
    console.log("queries",queries);
    var listQueries = [];
    queries.forEach(function(query) {
      console.log("query",query);
      listQueries.push(query);
      });
    if (!err) {
      return res.send(listQueries);
      }
    else {
      return console.log(err);
      }
  });
});

//get listViews
router.get('/listViews', function (req, res){
  View.find({}, function(err, views) {
    console.log("views",views);
    var listViews = [];
    views.forEach(function(view) {
      console.log("view",view);
      listViews.push(view);
      });
    if (!err) {
      return res.send(listViews);
      }
    else {
      return console.log(err);
      }
  });
});

//get listGraphics
router.get('/listGraphics', function (req, res){
  Graphic.find({}, function(err, graphics) {
    console.log("graphics",graphics);
    var listGraphics = [];
    graphics.forEach(function(graphic) {
      console.log("graphic",graphic);
      listGraphics.push(graphic);
      });
    if (!err) {
      return res.send(listGraphics);
      }
    else {
      return console.log(err);
      }
  });
});

//get query by name
router.get('/querybyname/:name', function (req, res){
  Query.findOne({name: req.params.name}, function (err, query) {
  if (!err) {
    return res.send(query);
    }
  else {
    return console.log(err);
    }
  });
});

//get graphic by name
router.get('/graphicbyname/:name', function (req, res){
  Graphic.findOne({name: req.params.name}, function (err, graphic) {
  if (!err) {
    return res.send(graphic);
    }
  else {
    return console.log(err);
    }
  });
});

//get view by name
router.get('/viewbyname/:name', function (req, res){
  View.findOne({name: req.params.name}, function (err, view) {
  if (!err) {
    return res.send(view);
    }
  else {
    return console.log(err);
    }
  });
});

// put query
router.put('/query',function (req, res) {
  var query =  new Query(req.body);
  query.save(function(err,result) {
    if (err)
       res.send(err);
    else
       return res.send(result);
    });
  });

// put graphic
router.put('/graphic',function (req, res) {
  var graphic =  new Graphic(req.body);
  graphic.save(function(err,result) {
    if (err)
       res.send(err);
    else
       return res.send(result);
    });
  });

// put view
router.put('/view',function (req, res) {
  var view =  new View(req.body);
  view.save(function(err,result) {
    if (err)
       res.send(err);
    else
       return res.send(result);
    });
  });

//get query by id
router.get('/query/:id', function (req, res){
  Query.findById(req.params.id, function (err, query) {
    if (!err)
      return res.send(query);
    else
      return console.log(err);
    });
  });

//get graphic by id
router.get('/graphic/:id', function (req, res){
  Graphic.findById(req.params.id, function (err, graphic) {
    if (!err) 
      return res.send(graphic);
    else 
      return console.log(err);
    });
  });

//get view by id
router.get('/view/:id', function (req, res){
  View.findById(req.params.id, function (err, view) {
    if (!err)
      return res.send(view);
    else
      return console.log(err);
    });
  });

/*********************************************************************************************/
// ROUTER mongodb (anciens appels)
/*********************************************************************************************/

//get query list by index, type
router.get('/queryList/:index/:type', function (req, res){
  var index=req.params.index;
  var type=req.params.type;
  Query.find({}, function(err, queries) {
    console.log("queries",queries);
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

// put cms_page
router.put('/mypage',function (req, res) {
  var cmspage =  new Cmspage(req.body);
  cmspage.save(function(err,result) {
    if (err)
       res.send(err);
    else {
       return res.send(result);
       }
    });
});


router.get('/viewes/:datasource/:viewtype/search/:query', function (req, res){
  var indice=req.params.datasource;
  var type=req.params.viewtype;
  var query=req.params.query;

  //var mybody = new esb.RequestBodySearch().query(new esb.termQuery('MaritalStatus','Female'));
  var mybody = new esb.RequestBodySearch().query(new esb.MatchAllQuery());
  console.log('esbmybody',mybody.toJSON());

  console.log('esbmybody',mybody.toJSON());

client.search({  
  index: indice,
  type: type,
  body: mybody.toJSON()   //   q: query
  },function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(resp);
      console.log("--- Hits ---");
      return res.send(resp.hits.hits);
     
    }
});
});

router.post('/myquery/:datasource/:viewtype', function (req, res){
  var indice=req.params.datasource;
  var type=req.params.viewtype;
  console.log('myquery req.body',req.body);
  var body= req.body;

  //var mybody = new esb.RequestBodySearch().query(new esb.termQuery('MaritalStatus','Female'));
  //var mybody = new esb.RequestBodySearch().query(new esb.MatchAllQuery());
  //console.log('esbmybody',mybody.toJSON());
  //console.log('esbmybody',mybody.toJSON());

  console.log('myquery indice',indice);
  console.log('myquery type',type);
  console.log('myquery body',body);


  client.search({  
  index: indice,
  type: type,
  body: body, //mybody.toJSON()
  },function (error, resp,status) {
    if (error){
      console.log("myquery error: "+error)
    }
    else {
      console.log("--- myquery status ---");
      console.log(status);
      console.log("--- myquery resp ---");
      console.log(resp);
      return res.send(resp);
     
    }
});
});

/*********************************************************************************************/
// ROUTER elasticsearch
/*********************************************************************************************/

router.get('/elastic/cluster', function (req, res){
client.cluster.health({},function(err,resp,status) {  
   return res.send(resp);
});
});



router.get('/elastic/indices', function (req, res){

client.cat.indices({
  format: "json"
}, function(err, resp) {
 if (resp instanceof Array) console.log('Array!');
    var nameMap = [];
    resp.forEach(function(indice) {
    nameMap.push(indice.index);
    });
    return res.send(nameMap); 


});

});





// get indices name
router.get('/elastic/indices/:esindex',function(req,res){
  var esindex=req.params.esindex;
  console.log("esindex",esindex);
  var esparams = esindex!="" ? '"index": "'+esindex+'"' : '';
  esparams = "{" + esparams + "}";
  
  
  client.indices.getMapping(JSON.parse(esparams), function(err,resp,status){
    
    if (!err) {
       return res.send(resp);
       }
    else {
       console.log("Error",err);
       return console.log(err);
       }
    });
});

//get indices types
router.get('/elastic/indices/:esindex/:estype',function(req,res){
  var esindex=req.params.esindex;
 
  var estype=req.params.estype;
 
  var esparams = esindex!="" ? '"index": "'+esindex+'"' : '';
  if (esparams!="")
     esparams = esparams + (estype!="" ? ' ,"type": "'+estype+'"' : '');
  else
     esparams = estype!="" ? '"type": "'+estype+'"' : '';
  esparams = "{" + esparams + "}";
  console.log("esparams",esparams);
 
  client.indices.getMapping(JSON.parse(esparams), function(err,resp,status){
 
    if (!err) {
       return res.send(resp);
       }
    else {
       console.log("Error",err);
       return err;
       }
    });
});




router.get('/elastic/indices/mappings/:indice/:type', function (req, res){
  var indice=req.params.indice;
  var type=req.params.type;

client.indices.getMapping({  
    'index': indice,
    'type': type,
  },
function (error,resp) {  
    if (error){
      return console.log(error.message);
    }
    else {
      var type=resp[Object.keys(resp)[0]].mappings;
   
        return res.send(type);
    }
});

});
///////////////////////////API For VIEW Config


router.get('/datasource', function (req, res){

client.cat.indices({
  format: "json"
}, function(err, resp) {
 if (resp instanceof Array) console.log('Array!');
    var nameMap = [];
    resp.forEach(function(indice) {
    nameMap.push(indice.index);
    });
    return res.send(nameMap); 


});

});

router.get('/views/:datasource', function (req, res){
  var indice=req.params.datasource;


client.indices.getMapping({  
    'index': indice
    
  },
function (error,resp) {  
    if (error){
      return console.log(error.message);
    }
    else {
      var type=resp[Object.keys(resp)[0]].mappings;
   
        return res.send(type);
      //  return res.send(resp);
    }
});

});

router.get('/view/:datasource/:viewtype', function (req, res){
  var indice=req.params.datasource;
  var type=req.params.viewtype;
console.log("ici");
console.log(type);
client.indices.getMapping({  
    'index': indice,
    'type': type,
  },
function (error,resp) {  
    if (error){
      return console.log(error.message);
    }
    else {
      var type=resp[Object.keys(resp)[0]].mappings;
   
        return res.send(type);
    }
});

});


router.get('/view/:datasource/:viewtype/:id', function (req, res){
  var indice=req.params.datasource;
  var type=req.params.viewtype;
  var id=req.params.id;
client.get({
    index: indice,
    type: type,
    id : id
}, function (error, response) {
   if (error){
      console.log("search error: "+error)
    }
    else {
      return res.send(response);
     
    }
});

});


router.get('/view/:datasource/:viewtype/search', function (req, res){
  var indice=req.params.datasource;
  var type=req.params.viewtype;
  var query=req.query.query;

client.search({  
  index: index,
  type: type,
  query:query
  },function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(resp);
      console.log("--- Hits ---");
      return res.send(resp.hits.hits);
     
    }
});
});

///

router.get('/view/:datasource/avg/:field', function (req, res){
  var indice=req.params.datasource;
  var field=req.params.field;
   var option=req.query.hits;
client.search({
    index: indice,
    body: {
        "aggs": {
            "avg_field": {
                "avg": {
                    "field": field
                }
            }
        }
    }

},function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      if (option == "true")
      {
        var result={};
        result["hits"]= resp.hits.hits;
        result["aggregation"]=resp.aggregations;
        return res.send(result);

      }else{
         return res.send(resp.aggregations);

      }


    }
});

});

///returns min max and avg mesure


router.get('/view/:datasource/:type/metrics/:field', function (req, res){
  var indice=req.params.datasource;
  var type=req.params.type;
  var field=req.params.field;
   var option="true"; //req.query.hits;
client.search({
            index: indice,
            type: type,
            body: {
                "aggs": {
                  avgvalue :
                    {
                        "avg": {
                            "field": field
                            }
                    },
                  minvalue: {
                        "min": {
                            "field": field
                            }
                    },
                  maxvalue: {
                        "max": {
                            "field": field
                            }
                    },
                  sumvalue : {
                        "sum": {
                            "field": field
                            }
                    },
                  type_count : {
                      "cardinality": {
                          "field": field
                          }
                    },
                  types_count : {
                      "value_count": {
                          "field": field
                          }
                    },
                  /*grades_stats : {
                    "extended_stats": {
                        "field": field
                        }
                    },
                  field_outlier : {
                      "percentiles": {
                          "field": field
                          }
                      },*/
                
                }
            }

},function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
       if (option == "true")
      {
        var result={};

        result["hits"]= resp.hits;
        result["aggregation"]=resp.aggregations;
         console.log("ICI",result);
        return res.send(resp);

      }else{

         return res.send(resp.aggregations);

      }
    
    }
});

});

///returns group by

router.get('/view/:datasource/:viewtype/groupby/:field', function (req, res){
  var indice=req.params.datasource;
  var type= req.params.viewtype;
  var field=req.params.field+".keyword";
  client.search({
    index: indice,
    type: type,
    body: {
      "size": 0,
       "aggregations": {
            "group_by_field": {
                "terms": {
                    "field": field
                }
            }
        }
    }

},function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
    
         return res.send(resp.aggregations);

    }
});

});




router.get('/view/:datasource/:viewtype/groupby/:field1/:field2', function (req, res){
  var indice=req.params.datasource;
  var type= req.params.viewtype;
  var field1=req.params.field1+".keyword";
  var field2=req.params.field2+".keyword";
  client.search({
    index: indice,
    type: type,
    body: {
      "size": 0,
       "aggregations": {
            "group_by_field1": {
                "terms": {
                    "field": field1
                },
                "aggs":{
                  "group_by_field2": {
                   "terms": {
                    "field": field2
                }


                }



            }
        }
    }

}},function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
    
         return res.send(resp.aggregations);

    }
});

});





//EXAMPLE OF COMPLEX QUERY


///par example la somme des ventes des équipements de comping par pays


router.get('/view/:datasource/:viewtype/Aggregation/:field1/By/:field2', function (req, res){
  var indice=req.params.datasource;
  var type= req.params.viewtype;
  var field1=req.params.field1+".keyword";
  var field2=req.params.field2+".keyword";
  var option=req.query.filter;
  var script="try { return Float.parseFloat(doc['"+field2+"'].value);} catch (NumberFormatException e) {return 0;}"
  if( option !== null && option !== ''){
   var parsedvalue=JSON.parse(option);
    client.search({
    index: indice,
    type: type,
    body: {
 "size":0,
 "query":{
  "term": parsedvalue

},
 "aggs" : {
     "states_by_sale" : {
         "terms" : {
           "field" : field1,
           "order": {
              "country_revenue" : "desc"
           }
         },
         "aggs": {
             "country_revenue": {
                "sum": {
                "script": script
                }
             }
          }
    },
    "total_revenue" : {
       "sum": {
          "script": script
       }
     }
 }
}






},function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
    
         return res.send(resp.aggregations);

    }
});

}else{


 client.search({
    index: indice,
    type: type,
    body: {
 "size":0,
 "query":{
  "term": parsedvalue

},
 "aggs" : {
     "states_by_sale" : {
         "terms" : {
           "field" : field1,
           "order": {
              "country_revenue" : "desc"
           }
         },
         "aggs": {
             "country_revenue": {
                "sum": {
                "script": script
                }
             }
          }
    },
    "total_revenue" : {
       "sum": {
          "script": script
       }
     }
 }
}






},function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
    
         return res.send(resp.aggregations);

    }
});



}





});











///returns min max and avg mesure


router.get('/view/:datasource/metrics/:field', function (req, res){
  var indice=req.params.datasource;
  var field=req.params.field;
   var option=req.query.hits;
client.search({
            index: indice,
            body: {
                "aggs": {
                  avgvalue :
                    {
                        "avg": {
                            "field": field
                        }
                    },
                    minvalue: {
                        "min": {
                            "field": field
                        }
                    },
                    maxvalue: {
                        "max": {
                            "field": field
                        }
                    },
                  
                }
            }

},function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
       if (option == "true")
      {
        var result={};

        result["hits"]= resp.hits.hits;
        result["aggregation"]=resp.aggregations;
         console.log("ICI",result);
        return res.send(result);

      }else{

         return res.send(resp.aggregations);

      }
    
    }
});

});




router.get('/view/:datasource/Sum/:field', function (req, res){
  var indice=req.params.datasource;
  var field=req.params.field;
  var option=req.query.hits;
client.search({
            index: indice,
            body: {
                "aggs": {
                   sumvalue :
                    {
                        "sum": {
                            "field": field
                        }
                   
                        }
                    },
                  
                }
            

},function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      if (option == "true")
      {
        var result={};

        result["hits"]= resp.hits.hits;
        result["sum"]=resp.aggregations;
         console.log("ICI",result);
        return res.send(result);

      }else{

         return res.send(resp.aggregations);

      }
    
    
    }
});

});



router.get('/metric/viewmatrix/:datasource', function (req, res){
  var indice=req.params.datasource;
  var fieldlist=req.query.fieldlist;
  var test=req.body;
  console.log("TEst",test);
    console.log("TEst",fieldlist);
client.search({
            index: indice,
            body: {
                "aggs": {
                  "matrixstats": {
                      "matrix_stats": {
                         "fields":  ["Salary", "Age"]
                           }
                       }
                    },
                  
                }
            

},function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
     
        console.log("Result",resp);
         return res.send(resp);

      }
    
    
    });
});


/*


router.get('/metric/viewGroupby/:datasource/:type', function (req, res){
  var indice=req.params.datasource;
 
client.search({
            index: "companydatabase",
            type: "employees",  
            body: {
              
  "aggs": {
    "group_by_age": {
      "range": {
        "field": "Age",
        "ranges": [
          {
            "from": 20,
            "to": 30
          },
          {
            "from": 30,
            "to": 40
          },
          {
            "from": 40,
            "to": 50
          },
          {
            "from": 50,
            "to": 60
          }
        ]
      },
      "aggs": {
        "group_by_salary": {
         
            "field": "Salary"
          },
       
        }
      }
    }
  }
},function (error, resp,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
     
        console.log("Result",resp);
         return res.send(resp);

      }
    
    
    });
});

*/









/*
client.search({
            index: 'grades',
            body: {
                "aggs": {
                    "avg_grade":
                    {
                        "avg": {
                            "field": "grade"
                        }
                    },
                    "min_grade": {
                        "min": {
                            "field": "grade"
                        }
                    },
                    "max_grade": {
                        "max": {
                            "field": "grade"
                        }
                    }
                }
            }






/*
http://localhost:9200/companydatabase/_search

{
   "aggs":{
      "avg_salary":{"avg":{"field":"Salary"}}
   }
}
*/





/******************** LDAP ***************************************/

router.get('/ldap/checklogin/:id/:pw', function (req, res){
  var id=req.params.id;
  var pw=req.params.pw;
  var resp;
  console.log("id",id);
  console.log("pw",pw);

  // accès au ldap pour id / pw
  if (id=="pcu1" && pw=="pcu1")
     resp="ok";
  else if (id!="pcu1")
     resp="koid";
  else if (id=="pcu1" && pw!="pcu1")
     resp="kopw";
  console.log("pw",pw);
  return res.send(resp);
});



module.exports = router;