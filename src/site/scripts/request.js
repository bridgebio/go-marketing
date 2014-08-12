var request = require('browser-request');
var lo = require('lodash');

document.addEventListener("DOMContentLoaded", function(e) {
  e.preventDefault();
  console.log("DOM fully loaded and parsed");
  // For request token page, cell number should be the focus input.
    document.querySelector('#cell').focus();

    // Setup on-click event listener for App Download Button
    var $appDownloadBtn = document.querySelector('.request-button');
    var $successOverlay = document.querySelector('.success-overlay');
    var $successDialog = document.querySelector('.success-dialog');
    var $tokenBtn = document.querySelector('.token-btn');

    $appDownloadBtn.addEventListener('click', function(e) {
      $successOverlay.classList.add('show');
      $successDialog.classList.add('show');
    });

    $successOverlay.addEventListener('click', function(e) {
      this.classList.remove('show');
      $successDialog.classList.remove('show');
      document.querySelector('#cell').focus();
    });

    $tokenBtn.addEventListener('click', function(e) {
      $successOverlay.classList.remove('show');
      $successDialog.classList.remove('show');
      document.querySelector('#cell').focus();
    });
});

