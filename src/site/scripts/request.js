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

  /* 
   * Function that validates user's cell phone numbers.
   * Validates the following format:
   *   +XX-XXXX-XXXX 
   *   +XX.XXXX.XXXX 
   *   +XX XXXX XXXX
   *
   * Note: phone regex validation came from StackOverflow:
   * URL: http://stackoverflow.com/questions/18375929/validate-phone-number-using-javascript
   *
   */
  function validatePhoneNumber(input) {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;  
    if( ( input.value.match(phoneno) ) ) {  
      return true;  
    } else {  
      alert("message");  
      return false;  
    }  
  }

});

