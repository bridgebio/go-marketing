var request = require('browser-request');
var lo = require('lodash');

document.addEventListener("DOMContentLoaded", function(e) {
  e.preventDefault();
  console.log("DOM fully loaded and parsed");

  // For request token page, cell number should be the focus input.
  document.querySelector('#cell').focus();

  /* 
   * Setup CLICK event listeners for GO Mobile Download Page.
   */ 
  var $appDownloadBtn = document.querySelector('.request-button');
  var $successOverlay = document.querySelector('.success-overlay');
  var $successDialog = document.querySelector('.success-dialog');
  var $tokenBtn = document.querySelector('.token-btn');

  $appDownloadBtn.addEventListener('click', function(e) {
    e.preventDefault();

    var cell = document.querySelector('#cell').value;
    var email = document.querySelector('#email').value;
    console.log('cell ...', cell);
    console.log('email ...', email);

    if (cell !== "") {

      console.log('Cell number is not empty');
      // Validate phone number format
      if (validatePhoneNumber(cell)) {
        console.log('Cell number is valid... submit to endpoint');
        showSuccessDialog();
      } 

    } else {
      // TODO: Display on error dialog
      alert('Please enter a phone number or email address.');
    }

    //showSuccessDialog();
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

  function showSuccessDialog() {
    $successOverlay.classList.add('show');
    $successDialog.classList.add('show');
  }

  /* 
   * Function that validates user's cell phone numbers.
   * Validates the following format:
   *   XX-XXXX-XXXX 
   *   XX.XXXX.XXXX 
   *   XX XXXX XXXX
   *
   * Note: phone regex validation came from StackOverflow:
   * URL: http://stackoverflow.com/questions/18375929/validate-phone-number-using-javascript
   *
   */
  function validatePhoneNumber(num) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
    if( ( num.match(phoneno) ) ) {  
      return true;  
    } else {  
      // TODO: Display on error dialog.
      alert("Please enter a valid phone number XX-XXX-XXXX");  
      document.querySelector('#cell').focus();
      return false;  
    }  
  }

});

