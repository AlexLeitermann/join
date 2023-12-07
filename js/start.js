function checkSwitch(htmlID) {
    let element = document.getElementById(htmlID);
    if(element.src.includes('false')) {
        element.src = './img/chk_true_main.png';
    } else {
        element.src = './img/chk_false_main.png';
    }
}

function openIt(page) {
    let element = document.getElementById(page);
    element.classList.add('inview');
}

function closeIt(page) {
    let element = document.getElementById(page);
    element.classList.remove('inview');
}


function signup() {
    const FORM_NAME = document.getElementById('signup-username');
    const FORM_EMAIL = document.getElementById('signup-email');
    const FORM_PASSWORD = document.getElementById('signup-password');
    const FORM_CONFPASS = document.getElementById('signup-confirm-password');
    checkValidations(FORM_NAME, FORM_EMAIL, FORM_PASSWORD, FORM_CONFPASS);
}


function checkValidations(name, email, password, confpass) {
    let validity = 0;
    validity += checkValidationName(name) * 1;
    validity += (password === confpass ? true : false) * 1;
}


function checkValidationName(name) {
    let wordlist = name.split(" ");
    return wordlist > 1 ? true : false;
}


function ValidateEmail(input) {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }





