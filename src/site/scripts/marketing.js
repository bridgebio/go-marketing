var request = require('browser-request');
var _ = require('lodash');

document.addEventListener("DOMContentLoaded", function(e) {
  e.preventDefault();
  console.log("DOM fully loaded and parsed");
  var $mobileDownload = document.querySelector('#mobileDownload'); 

  $mobileDownload.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('init download');
    request('http://localhost:5001/download', function(er, res, body) {
      console.log('download response...', res);

      if (er) {
        throw er;
      } 

      if (res.status === 501) {
        console.log('encountered 501... display error');
        var $errorDialog = document.querySelector('.error-dialog');
        console.log('errorDialog', $errorDialog);
        var $errorTemplate = document.querySelector('#errorTemplate');
        console.log('errorTemplate', $errorTemplate);
        // Load error dialog template
        //$errorDialog.append( _.template($errorTemplate.html()) );
      }

    })
  });
});
