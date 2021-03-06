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
  //var $emailInput = document.querySelector('#email');
  var $errorDialog = document.querySelector('.error-dialog');    
  var $notificationTemplate = document.querySelector('#notificationTemplate');
  var $downloadForm = document.querySelector('.request-input');
  var $downloadBtn = document.querySelector('.request-button');

  // For request token page, cell number should be highlighted and ready for input.
  // Blank out all form fields (both email and cell phone).
  $cellInput.focus();
  $cellInput.form.reset();
  //$emailInput.form.reset();

  $downloadBtn.addEventListener('click', function(e) {
    e.preventDefault();
    var cell = $cellInput.value;

    if (cell === "") {
      var errorMsg = {
        title: 'Oops!',
        message: 'You forgot to enter a cell phone number.'
      }
      showErrorDialog(errorMsg);
      e.preventDefault();
    }

    if (cell !== "") {
      // Send POST request for sms message.
      var options = {
        method: 'POST', 
        url: 'sms-me',
        body: JSON.stringify({phone: cell}),
        json: true
      }
      console.log(options);
      request(options, function(er, response, body) {
        console.log('response..', response);
        console.log('args..', arguments);
        if (response.status === 200) {
          showSuccessDialog();
        } else {
          var errorMsg = {
            title: 'Invalid Phone Number Format',
            message: 'Please enter a valid phone number'
          }
          showErrorDialog(errorMsg);
          document.querySelector('#cell').focus();
          return false;
        }
      });
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

