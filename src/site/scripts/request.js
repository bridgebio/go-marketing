var request = require('browser-request');
var lo = require('lodash');

document.addEventListener("DOMContentLoaded", function(e) {
  e.preventDefault();
  console.log("DOM fully loaded and parsed");

  /* 
   * Setup CLICK event listeners for GO Mobile Download Page.
   */ 
  var $appDownloadBtn = document.querySelector('.request-button');
  var $successOverlay = document.querySelector('.success-overlay');
  var $successDialog = document.querySelector('.success-dialog');
  var $tokenBtn = document.querySelector('.token-btn');

  /* 
   * Get items from the DOM and cache them for future use.
   */
  var $cellInput = document.querySelector('#cell');  
  var $emailInput = document.querySelector('#email');
  var $errorDialog = document.querySelector('.error-dialog');    
  var $notificationTemplate = document.querySelector('#notificationTemplate');

  // For request token page, cell number should be highlighted and ready for input.
  $cellInput.focus();

  $appDownloadBtn.addEventListener('click', function(e) {
    e.preventDefault();

    var cell = $cellInput.value;
    var email = $emailInput.value;

    if (cell !== "") {
      // Validate phone number format
      if (validatePhoneNumber(cell)) {
        // TODO: Submit request with endpoint here.
        // success dialog will normally be wrapped within response callback from server.
        showSuccessDialog();
      } 
    } 

    if (email !== "") {
      // Validate email address.
      if (validateEmail(email)) {
        // TODO: Submit request with endpoint.
        console.log('validate email address...');
        // success dialog will normally be wrapped within response callback from server.
        showSuccessDialog();
      }
    }

    // If both email and cell number fields are blank, notify the user.
    if (email === "" && cell === "") {
      var errorMsg = {
        title: 'Oops!',
        message: 'You forgot to enter a cell number or email address.'
      }
      showErrorDialog(errorMsg);
    }

  });

  $successOverlay.addEventListener('click', function(e) {
    this.classList.remove('show');
    $successDialog.classList.remove('show');
    focusPhoneNumber();
  });

  $tokenBtn.addEventListener('click', function(e) {
    $successOverlay.classList.remove('show');
    $successDialog.classList.remove('show');
    focusPhoneNumber();
  });

  function focusPhoneNumber() {
    // Make sure that any error dialog is closed and hidden.
    hideErrorDialog();
    $cellInput.focus();
  }

  function focusEmailAddress() {
    // Make sure that any error dialog is closed and hidden.
    hideErrorDialog();
    $emailInput.focus();
  }

  function showErrorDialog(msgObj) {
    $errorDialog.innerHTML = lo.template($notificationTemplate.innerHTML, { title: msgObj.title, message: msgObj.message });
    $errorDialog.classList.add('show'); 
    // Remove the error dialog after 8 seconds.
    window.setTimeout(function() {
      hideErrorDialog(); 
    }, 8000);
  }

  function showSuccessDialog() {
    $successOverlay.classList.add('show');
    $successDialog.classList.add('show');
    hideErrorDialog();
  }

  /* 
   * Quickly hide the error dialog.
   */
  function hideErrorDialog() {
    $errorDialog.classList.remove('show'); 
  }

  /* 
   * Function that validates user's cell phone numbers.
   * Validates the following format:
   *   XXX-XXX-XXXX 
   *   XXX.XXX.XXXX 
   *   XXX XXX XXXX
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
      var errorMsg = {
        title: 'Invalid Phone Number Format',
        message: 'Please enter a valid phone number (i.e. XXX-XXX-XXXX, XXX.XXX.XXXX, XXX XXX XXXX)'
      }
      showErrorDialog(errorMsg);
      document.querySelector('#cell').focus();
      return false;  
    }  
  }

  /* 
   * Email validation function from StackOverflow:
   *
   * URL: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript 
   */
  function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(email);
    console.log('validate output...', re.test(email));
    if(re.test(email)) {
      return true;
    } else {
      var errorMsg = {
        title: 'Invalid Email Format',
        message: 'Please enter a valid email address.'
      }
      showErrorDialog(errorMsg);
      document.querySelector('#cell').focus();
      return false;  
    }
  } 

});

