var request = require('browser-request');
var lo = require('lodash');

document.addEventListener("DOMContentLoaded", function(e) {
  e.preventDefault();
  console.log("DOM fully loaded and parsed");
  var $mobileDownload = document.querySelector('#mobileDownload'); 

  $mobileDownload.addEventListener('click', function(e) {
    e.preventDefault();
    //request('http://localhost:5001/download', function(er, res, body) {
    request('http://services.glgresearch.com/go-marketing/download', function(er, res, body) {

      if (er) {
        throw er;
      } 

      if (res.status === 200) {
        var msg = JSON.parse(res.body);
        // reload the page with redirect to download GO mobile app.
        window.location = msg.redirect;
      }
      else if (res.status === 501) {
        // Display error dialog for 501 response code.
        var errorResponse = JSON.parse(res.body);
        var $errorDialog = document.querySelector('.error-dialog');
        var $errorTemplate = document.querySelector('#errorTemplate');
        $errorDialog.innerHTML = lo.template($errorTemplate.innerHTML, {title: errorResponse.unsupported.title, message: errorResponse.unsupported.message});
        $errorDialog.classList.add('show'); 
        // Remove the error dialog after 8 seconds.
        window.setTimeout(function() {
          $errorDialog.classList.remove('show'); 
        }, 8000);
      }


    }.bind(this));
  });
});
