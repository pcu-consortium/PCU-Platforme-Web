'use strict';

var debug = require('debug')('arma:admin:api-router');
var express = require('express');
var router = express.Router();
var manager = require('./admin-manager.js');

// Prefix all routes
var apiRouter = express.Router();
apiRouter.use('/admin', router);

module.exports = apiRouter;
