var debug = require('debug')('arma:app');
var errorLog = require('debug')('arma:error');
var assert = require('assert');

var express = require('express');
var path = require('path');
global.appRoot = path.resolve(__dirname);
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var flash = require('connect-flash');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var config = require('./modules/config').all();
///////////
//Swagger
var swaggerUi = require('swagger-ui-express');
var argv = require('minimist')(process.argv.slice(2));
var swaggerDocument = require('./swagger.json');
 var swagger = require("swagger-node-express");
 const mime = require('mime');

//
var apiRoutes = require('./routes/api');
var uuid = require('node-uuid');
var db = require('./modules/db').db;
var User= require('./modules/user/user.js');
var _ = require('lodash');
var pageUtils = require('./utils/page-utils');

var contentManager = require('./modules/cms/content-manager');

var webpack, webpackMiddleware, webpackConfig, webpackCompiler, hmr;
///For Token 
const jwt = require('jsonwebtoken');
var jwts= require('jwt-simple');
var jwtOptions = {}
jwtOptions.secretOrKey =  uuid.v4();


var cors = require('cors');




var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(expressSession({secret: 'armadillo-ekjrgr'}));
app.use(flash());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
 // done(null, id); // Simply using the name for now...
  User.findById(id, function(err, user) {
    done(err, user);
   });
});

app.use(passport.initialize());
app.use(passport.session());

var isDevEnv = (app.get('env') === 'development');
console.log('isDevEnv', isDevEnv);
var hasWebpack = isDevEnv && (process.env.SERVER_MODE !== "api");
if (hasWebpack){
    hmr = require("webpack-dev-hmr");
    webpack = require("webpack");
    webpackMiddleware = require("webpack-dev-middleware");
    webpackConfig = require("./webpack.config.js");
    webpackCompiler = webpack(webpackConfig);

    app.use(webpackMiddleware(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        watchDelay: 300,
        stats: {
            colors: true
        }
    }));
}

// Aggressive Cache-Control for font files
app.use(function (req, res, next) {
    if (req.url.match(/^\/stylesheets\/fonts\/.+/)) {
        var maxAge = 3600*24*7; // 1 week
        res.setHeader('Cache-Control', 'public, max-age=' + maxAge);
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Static assets management
var staticAsset = require('static-asset');
var staticStrategy = require('./modules/cache-strategies/strategy-date');
app.use(staticAsset(path.join(__dirname, 'public'), staticStrategy));
app.use(express.static(path.join(__dirname, 'public')));


passport.use(new LocalStrategy({
    passReqToCallback : true
  }, function(req, username, password, done){
    // var isValid = (password.length == (username.length + 2)) && (password == username + username[0] + username[username.length-1]);
   // const isValid = true;//(username === "admin") && (password === "campus-190");
    User.findOne({ username: username, password: password },function(err,user){
        if(err){
          return done(err,false);
        }
        if(user){
          done(null,user);
        }else{
          done(null,false);
        }


    });
   





  }
));

// Define default route for a generic site
var router = express.Router();

var webRouter = express.Router();

var routerWithLogin = express.Router();


var isAuthenticated = function (req, res, next) {
  console.log('isAuthenticated');
  if (req.isAuthenticated())
    return next();
  req.session.return_to = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.redirect('/' + req.site + '/login');
};

/*
routerWithLogin.post('/login', passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect(req.session.return_to || '/' + req.site);
    req.session.return_to = null;
  },serialize,generateToken,respond);

*/
routerWithLogin.post('/login', passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect(req.session.return_to || '/' + req.site);
    req.session.return_to = null;
  },respond);




routerWithLogin.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});



routerWithLogin.post('/auth', passport.authenticate(  
  'local', {
    session: true
  }), serialize, generateToken, respond);


const db2 = {  
  updateOrCreate: function(user, cb){
    // db dummy, we just cb the user
    cb(null, user);
  }
};




function serialize(req, res, next) {  
  db2.updateOrCreate(req.user, function(err, user){
    if(err) {return next(err);}
    // we store the updated information in req.user again
    req.user = {
      id: user._id
    };
    next();
  });
};


/*function generateToken(req, res, next) {  
  req.token = jwt.sign({
    id: req.user._id,
  }, jwtOptions.secretOrKey, {
   expiresIn : 60*60*24
  });
  next();
};*/

function generateToken(req, res, next) {  

console.log("UserId",req.user );
console.log("Secret",jwtOptions.secretOrKey);
var payload =  {id: req.user };
var token = jwts.encode(payload, jwtOptions.secretOrKey);
  

req.token =token;
   next();


};





function respond(req, res) {  

  
  res.status(200).json({
    user: req.user.id,
    token: req.token
  });
};


/// Verfify Token



routerWithLogin.post('/verify',   validate);



function verifyToken(req, res, next) {  
   console.log("ERRRRR",jwtOptions.secretOrKey);
   try{
     var  verifiedJwt = jwt.verify(req.token,jwtOptions.secretOrKey);
       }catch(e){
         console.log(e);
        }
   req.decoded= verifiedJwt ;
  next();
  

};

function validate(req, res,next) {
  var token = req.token||req.body.token || req.query.token || req.headers['x-access-token'];
  var secret = 'xxx';
  console.log ("Token",token);
 try{
  var decoded = jwts.decode(token, jwtOptions.secretOrKey);
  console.log("Decod",decoded);
  req.decoded= decoded.id  ;
   console.log("Decod2",req.decoded.id);
 return User.findById(req.decoded.id, function (err, user) {
    if (!err) {
      return res.send(user);
    } else {
      return console.log(err);
    }
  });
}catch(e){
  console.log(e);
next()
}
   


};



function respondverify(req, res) {  
  res.status(200).json({
    user: req.user.id,
    token: req.token
  });
   

};


//return current user

routerWithLogin.get('/currentuser',   function(req, res) {
   
   try{
          return User.findById(req.user.id, function (err, user) {
            if (!err) {
                   var profiles=user.profiles
                    return res.send(profiles );
            } else {return console.log(err);
                   }
             });
      }catch(e){
          console.log(e);
           next();
          }
    

   
  });












// routerWithLogin.post('/login', passport.authenticate('local', {
//   successRedirect: '/psa/search',
//   failureRedirect: '/psa/login',
//   failureFlash: 'Incorrect username or password'  
//   // failureFlash : true 
// }));

routerWithLogin.get('/login', function(req, res){
  var content = {
    username: req.query.username,
    error: req.flash('error')
  };
  pageUtils.computePage(contentManager, {app: 'login', content: content}, 'react-layout', req, res);
});

routerWithLogin.use(isAuthenticated);

_.forIn(require('./modules'), function(module, moduleName) {
  if (moduleName == 'admin'){
    debug('add admin routes for ' + moduleName);
    routerWithLogin.use(module.router);
  } else if (module.router){
    debug('add routes for ' + moduleName);
    webRouter.use(module.router);
  }
});
router.use(webRouter);
router.use('/api',      apiRoutes);
router.use(routerWithLogin);

// psaRouter.use(require('connect-ensure-login').ensureLoggedIn('/psa/login'), router);

//psaRouter.use('/api',      apiRoutes); // Allow API calls
//psaRouter.use(isAuthenticated);
 //psaRouter.use(webRouter);

app.use('/ping', function(req, res){
  res.json({result: 'pong'});
});

var dd=new Date();
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/files');
  },
  filename: function (req, file, callback) {
    callback(null,  req.pref +file.originalname);
    //console.log(file);
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.post('/api/photo',function(req,res,next){
  debug("image upload");
  var pre=(Math.floor((Math.random() * 1000) + 1)).toString();
  req.pref=pre;
  upload(req,res,function(err) {        
    if(err) {
      console.log(err);
      //debug("Error uploading file.",err);
      //return next(err);
      //return res.end("Error uploading file.");
      return res.end(err);
    }
    debug("File is uploaded");
    res.end( pre + req.file.originalname);
  });
});



// And apply route to all sites
app.use('/:site', function(req, res, next){
    var site = req.params.site;
    res.locals.site = req.params.site;
    res.locals.baseUrl = '/' + req.params.site + '/';
    res.locals.api = res.locals.baseUrl + 'api';
    if (config.sites.indexOf(site) == -1){
        // Failed to find site !
        //var err = new Error('Site ' + site + ' not found in "' + req.path + '"');
        //err.status = 404;
        //next(err);
    } else {
        req.site = site; // Make the 'site' variable accessible to anyone
        // if (site == "psa"){
        //   psaRouter(req, res, next);
        // } else {
        router(req, res, next);
        // }

    }
});

/*
//Here is function for uploading an image
app.use('/image', function(req, res){
  debug(req);
  debug("image upload");
});
*/

app.get('/', function (req, res) {
  debug('redirect to root site');
  res.statusCode = 302;
  res.setHeader("Location", '/pcu');
  res.end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    errorLog(err.stack);

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//configure swagger-ui
///////////////////////
/*var subpath = express();

app.use("/v1", subpath);
swagger.setAppHandler(subpath);
app.use(express.static('dist'));
swagger.setApiInfo({
    title: "example API",
    description: "API to do something, manage something...",
    termsOfServiceUrl: "",
    contact: "yourname@something.com",
    license: "",
    licenseUrl: ""
});

subpath.get('/', function (req, res) {
    res.sendfile(__dirname + '/dist/index.html');
});


swagger.configureSwaggerPaths('', 'api-docs', '');

var domain = 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".');
var applicationUrl = 'http://' + domain;
swagger.configure(applicationUrl, '1.0.0');*/


var options = {
  validatorUrl : null,
  oauth: {
   clientId: "your-client-id1",
   clientSecret: "your-client-secret-if-required1",
   realm: "your-realms1",
   appName: "your-app-name1",
   scopeSeparator: ",",
   additionalQueryStringParams: {}
 }
};

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, false, options, '.swagger-ui .topbar { background-color: bleu }'));

router.get('/', function(req, res) { res.json({ status: 'OK'}); });
router.get('/bar', function(req, res) { res.json({ status: 'OKISH'}); });

/*

app.use(express.static('dist'));
routerWithLogin.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument),function(err, req, res, next) {


if (!res.getHeader('content-type')) {
  var charset = mime.charsets.lookup(type);
  res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
}}


  );*/



/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////




//create an http server that listens for requests
var server = app.listen(process.env.SERVER_PORT || process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
    if (hasWebpack){
        hmr.listen(server, webpackCompiler);
    }
}).on('close', function(){
    logger.info('closing server');

    if (hasWebpack){
        hmr.close();
    }
});

module.exports = app;