'use strict'

var express         = require('express');
var http            = require('http');
var path            = require('path');
var fs              = require('fs');
var middleware      = require('./lib/middleware');
var bodyParser      = require('body-parser');

// Initialize Express
var app = module.exports = express();
app.disable('x-powered-by');
app.set('port', process.argv[2] || process.env.PORT || 5001);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// Normalize the URL by stripping off the trailing / and .html
//app.use(middleware.normalizeUrl());
app.use(express.static(path.join(__dirname, 'build')));
var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('start go-marketing...');
  console.log('server started on port: ' + app.get('port'));
});

// Initialize the application routes
app.get('/', function(req, res, next) {
  res.render('index');
});

/*
 * Download request for mobile view.  Difference
 * between /download is the response is JSON formatted. 
 */
app.get('/download-request', function(req, res, next) {
  var agent = req.get('user-agent');
  var redirectUrl = 'itms-services://?action=download-manifest&url=https://services.glgresearch.com/go-marketing/Go.plist'; 
  if ( agent.match(/(iPhone|iPad|iPod)/) ) {
    res.json(200, {redirect: redirectUrl});
  } else {
    res.json(501, {
      unsupported: {
        title: 'Unsupported Mobile Device',
        message: 'You are using an unsupported mobile device. GLG/GO Mobile only supports the iPhone.'
      }
    });
  }
});

// Route for downloading GO App via URL redirect.
app.get('/download', function(req, res, next) {
  var agent = req.get('user-agent');
  if ( agent.match(/(iPhone|iPad|iPod)/) ) {
    return res.redirect('itms-services://?action=download-manifest&url=https://services.glgresearch.com/go-marketing/Go.plist');
  } else {
    res.send(404, 'Unsupported platform');
  }
});

app.post('/sms-me', function(req, res) {
  if (!req.body) {
    return res.send(400, 'No post body');
  }
  var phone = req.param('phone');
  if (!phone) { //TODO: validate phone
    return res.send(400, 'No phone in post body');
  }
  var accountSid = process.env.TWILIO_SID;
  var authToken = process.env.TWILIO_AUTH;
  var client = require('twilio')(accountSid, authToken);
   
  client.messages.create({
    body: 'Click http://goo.gl/1M9aZ3 to download Go Mobile.',
    to: phone,
    from: '+16464930828'
  }, function(err, message) {
    if (err && err.status === 400)  {
      return res.send(400);
    }
    if (err) {
      return res.send(500, 'Unable to send sms text');
    }
    console.log(message);
    return res.send(200);
  });
})
