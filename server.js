require('source-map-support').install();
require('babel/register');

var app = require('./app');
//var server = app.listen(process.env.SERVER_PORT || process.env.PORT, function () {
//	var host = server.address().address;
//	var port = server.address().port;
//
//	console.log('Listening at http://%s:%s', host, port);
//});