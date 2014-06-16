'use strict'

var express         = require('express');
var http            = require('http');
var path            = require('path');
var fs              = require('fs');
var middleware      = require('./lib/middleware');

// Initialize Express
var app = module.exports = express();
app.disable('x-powered-by');
app.set('port', process.argv[2] || process.env.PORT || 5001);
app.use(express.static(path.join(__dirname, 'build')));

// Normalize the URL by stripping off the trailing / and .html
//app.use(middleware.normalizeUrl());

app.use(express.static(path.join(__dirname, 'build')));
var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('server started on port: ' + app.get('port'));
});

// Initialize the application routes
app.get('/', function(req, res, next) {
  res.render('index');
});

