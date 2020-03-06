'use strict';

var debug = require('debug')('arma:pcu:elastic:api-router');
var express = require('express');
var mongoose = require('mongoose');
var router = require('express').Router();



var client =require('./elastic-management.js');
var Query= require('./query.js');
var querySchema=require('mongoose').model('query').schema;

var esb = require('elastic-builder');


/*********************************************************************************************/
// ROUTER mongodb
/*********************************************************************************************/

// put query
router.put('/query',function (req, res) {
  var query =  new Query(req.body);
  query.save(function(err,result) {
    if (err)
       res.send(err);
    else {
       return res.send(result);
       }
    });
});

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

//get query by id
router.get('/query/:id', function (req, res){
    Query.findById(req.params.id, function (err, query) {
    if (!err) {
      return res.send(query);
    } else {
      return console.log(err);
    }
  });
});

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











module.exports = router;