var debug = require('debug')('arma:campusaar:user:api-router');

var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = require('./user.js');
var Profile= require('./profile.js');
//var manager = require('./user-manager');
var Task=require('./task.js');
var userSchema=require('mongoose').model('user').schema;
var profilSchema=require('mongoose').model('profile').schema;

// connect to Mongo when the app initializes
mongoose.connect("mongodb://localhost:27017/campus-aar-pre-production", {
  server: {
    socketOptions: {
      socketTimeoutMS: 20000,
      connectTimeoutMS: 20000
    }
  }
});
//Language Mapping

var removeLanguage = function(str){
  return str.replace(/^"(.*)"@[a-z]+/g, "$1");
};




var resolveMapping = function(data){
  var mapping = require('./usermap.json');
  var resolve = function(value){
    var resvalue={};
    if ((typeof value) === "string"){
        if (value in mapping) {
          resvalue={"val": mapping[value].fr, "id": mapping[value].id};
          return resvalue;
        }
      resvalue[value]={"val": value, "id": value};
      return value;
    } else if (Array.isArray(value)){
      return value.map(resolve);
    } else if ((typeof value) == "object"){
      var obj = {}; // Both keys and values may need fixing
      for(var key in value){
        if (value.hasOwnProperty(key)){
          var fKey = resolve(key);
          var fValue = resolve(value[key]);
          obj[fKey] = fValue;
        }
      }
      return obj;
      // return _.mapValues(value, resolve);
    } else {
      return value;
    }
  };

  return resolve(data);
};  

var resolveProfileMapping = function(data){
  var mapping = require('./profilemap.json');
  var resolve = function(value){
  var resvalue={};
  if ((typeof value) === "string") {
    if (value in mapping) {
      resvalue={"val": mapping[value].fr, "id": mapping[value].id};
      return resvalue;
      }
    resvalue[value]={"val": value, "id": value};
    return value;
    } else if (Array.isArray(value)){
    return value.map(resolve);
    } else if ((typeof value) == "object"){
    var obj = {}; // Both keys and values may need fixing
    for(var key in value){
      if (value.hasOwnProperty(key)){
        var fKey = resolve(key);
        var fValue = resolve(value[key]);
        obj[fKey] = fValue;
        }
      }
    return obj;
    // return _.mapValues(value, resolve);
    } else {
    return value;
    }
  };

  return resolve(data);
};  

/***************************************************************************************************/
/*                                                                                                 */
/*  User Management                                                                   */
/*                                                                                                 */
/***************************************************************************************************/

//add new user and get his id
router.put('/user',function(req, res) {
    var userb =  new User(req.body);
    userb.save(function(err,result) {
            if (err)
                res.send(err);
             else{
                return res.send(result._id);
           // res.json({  'user created!' });
          }
        });

});
  

//get user by id
router.get('/user/:id', function (req, res){
    User.findById(req.params.id, function (err, user) {
    if (!err) {
      return res.send(user);
    } else {
      return console.log(err);
    }
  });


});


router.get('/user/name/:name', function (req, res){
   var name=req.params.name
   User.find({'username': name}, function(err, user) {
     if (!err) {
            return res.send(user);
    }
    else {
            return console.log(err);
    }
     
  });
});





//get user by filter

//update user by id


router.put('/user/:id', function (req, res){
  var query = {'_id':req.params.id};
  req.newData = req.body;
  User.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
  });

});

//delete  user by id
router.delete('/user/:id', function (req, res){
  User.remove({ _id: req.params.id }, function(err) {
    if (!err) {
            return res.send("Le compte utilisateur a été supprimé.");
    }
    else {
            return console.log(err);
    }
  });
});


router.get('/userschema',function(req,res){
  var props =  resolveMapping(Object.keys(userSchema.paths));
  console.log("sechema",props)
  res.send(props);
});
router.get('/multivalue/:name',function(req,res){
 var valuelist=userSchema.path(req.params.name).enumValues;
 console.log("list",valuelist);
 res.send(valuelist);
});

//////


router.get('/usersList', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = [];

    users.forEach(function(user) {
      userMap.push( user);
    });

    res.send(userMap);  
  });
});

///Get user profile liste

router.get('/user/profile/:name', function (req, res){
   var name=req.params.name
   User.find({'username': name}, function(err, user) {
     if (!err) {
            return res.send(user);
    }
    else {
            return console.log(err);
    }
     
  }).select( 'profiles');
});











////////////////////////////////////////////////Task function/////////////////////////////////////////////////////////////////

//add new task and get his id 

router.put('/task',function (req, res) {
    var taskb =  new Task(req.body);
    taskb.save(function(err,result) {
      if (err)
         res.send(err);
      else
         return res.send(result._id);
    });
});

///Update exist
router.put('/task/:id', function (req, res){
  var query = {'_id':req.params.id};
  req.newData = req.body;
  Task.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
  });

});


//get task by id

router.get('/task/:id', function (req, res){
  return Task.findById(req.params.id, function (err, task) {
    if (!err) {
      return res.send(task);
    } else {
      return console.log(err);
    }
  });
});

//find task in tache from Profiles

router.get('/profiletask/name/:name', function (req, res){
  var name=req.params.name;
  Task.find({'taskname': name}, function(err, task) {
    if (!err) {
      if (task.length==1) {
          var id = String(task[0]._id);
          Profile.find({'tache': id}, function(err, profile) {
            if (!err)
              return res.send(profile);
            else
              return console.log(err);
          });
        }
      }
    else
      return console.log(err);
  });
});

//find task in Tasks

router.get('/task/name/:name', function (req, res){
  var name=req.params.name;
  Task.find({'taskname': name}, function(err, task) {
  if (!err)
     return res.send(task);
  else
     return console.log(err);
  });
});

// delete  task by id
router.delete('/task/:id', function (req, res){
  Task.remove({ _id: req.params.id }, function(err) {
    if (!err)
       return res.send("La tâche a été supprimée.");
    else
       return console.log(err);
  });
});

//get list of tasks

router.get('/taskList',function(req,res){
  Task.find({}, function(err, tasks) {
    var taskMap = [];
    tasks.forEach(function(task) {
      taskMap.push(task);
    });
    res.send(taskMap);  
  });
});

//get all task

router.get('/taskname',function(req,res){
  Task.find({}, function(err, tasks) {
    var taskName = [];
    tasks.forEach(function(task) {
      taskName.push({"value": task.taskname, "label": task.taskname,"_id":task._id});
    });
    res.send(taskName);  
  });
});


////////////////////////////////////////////////Profile function/////////////////////////////////////////////////////////////////

//get profile schema
router.get('/profilschema',function(req,res){
  var props =  resolveMapping(Object.keys(profilSchema.paths));
  console.log("schema",props)
  res.send(props);
});

//add new  profile
router.post('/profile',function(req, res) {
  console.log("Profile",req);
  new Profile(req.body).save(function(err,profil) {
  return  res.send(profil);
});
  
});

//update profile by id
router.put('/profile/:id', function (req, res){
  var query = {'_id':req.params.id};
  req.newData = req.body;
  Profile.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
  if (err) {
    console.log(err);
    return res.send(500, { error: err });
    }
  console.log("router put /profile/:id","Profile updated");
  return res.send("Le profil a été modifié.");
  });
});


//delete  profil by id
router.delete('/profile/:id', function (req, res){
  Profile.remove({ _id: req.params.id }, function(err) {
    if (!err) {
            return res.send("Le profil a été supprimé.");
    }
    else {
            return console.log(err);
    }
  });
});


// get profile by id
router.get('/profile/:id',function(req,res){
  var query = {'_id':req.params.id};
  Profile.find(query, function(err, profiles) {
    var myprofile = [];
    console.log("profiles",profiles);
    profiles.forEach(function(profile) {
       console.log("each",profile);
       myprofile.push({"profilename": profile.profilename, "profileid": profile.profileid, "description": profile.description, "portail": profile.portail, "tache": profile.tache, "_id": profile._id}); 
    });

    res.send(myprofile);  
  });


});
router.get('/profile/tasks/:name/:portail', function (req, res){
  var name=req.params.name;
  var portail=req.params.portail;
    Profile.find({'profilename': name, 'portail': portail}).populate('tache') . exec (function(err, profile) {
  if (!err)
     return res.send(profile);
  else
     return console.log(err);
  });
});








//find profile/portail in Profiles

router.get('/profileportail/name/:name/:portail', function (req, res){
  var name=req.params.name;
  var portail=req.params.portail;
  Profile.find({'profilename': name, 'portail': portail}, function(err, profile) {
  if (!err)
     return res.send(profile);
  else
     return console.log(err);
  });
});

//find profile/portail in Users

router.get('/userprofile/name/:name/:portail', function (req, res){
  var name=req.params.name;
  var portail=req.params.portail;
  User.find({$or: [{'profiles': {'profilename':name, 'portail': portail}},{'tempprofiles': {'profilename':name, 'portail': portail}}]}, function(err, user) {
  if (!err)
     return res.send(user);
  else
     return console.log(err);
  });
});


//get all task

router.get('/profileList',function(req,res){

 Profile.find({}, function(err, profils) {
    var profilMap = [];

   profils.forEach(function(profil) {
       profilMap.push(profil);
    });

 

    res.send(profilMap);  
});


});

//getdistinct

router.get('/profileListdis',function(req,res){

 Profile.find({}).distinct('profilename', function(err, profils) {
    var profilMap = [];

   profils.forEach(function(profil) {
       profilMap.push(profil);
    });

 

    res.send(profilMap);  
});


});


//get only  profilename, description



router.get('/profileName',function(req,res){

 Profile.find({}, function(err, profils) {
    var profileName = [];
    var valuelist=profilSchema.path('portail').enumValues;
    profils.forEach(function(profil) {
       profileName.push({"profilename": profil.profilename, "description": profil.description,"portail":valuelist});
     
    });

    res.send(profileName);  
  });


});






router.get('/portail',function(req,res){
 var valuelist=profilSchema.path('portail').enumValues;
 console.log("list",valuelist);
 res.send(valuelist);
});



module.exports = router;