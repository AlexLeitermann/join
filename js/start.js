function checkSwitch(htmlchkID, htmlimgID) {
    let chkelement = document.getElementById(htmlchkID);
    let imgelement = document.getElementById(htmlimgID);
    if(chkelement.checked) {
        imgelement.src = './img/chk_true_main.png';
    } else {
        imgelement.src = './img/chk_false_main.png';
    }
}

function openIt(page) {
    let element = document.getElementById(page);
    element.classList.add('inview');
    if(page=='signup') {
        document.getElementById('signup-username').focus();
    }
}

function closeIt(page) {
    let element = document.getElementById(page);
    element.classList.remove('inview');
    if(page == 'signup') {
        document.getElementById('login-email').focus();
    }
}


function togglePasswordView(field) {
    const passwordfield = document.getElementById(field);
    if(passwordfield.type == "password") {
        passwordfield.type = "text";
    } else {
        passwordfield.type = "password";
    }
    passwordfield.focus();
}


function signup() {
    const FORM_NAME = document.getElementById('signup-username');
    const FORM_EMAIL = document.getElementById('signup-email');
    const FORM_PASSWORD = document.getElementById('signup-password');
    const FORM_CONFPASS = document.getElementById('signup-confirm-password');
    const FORM_PRIVACYPOLICY = document.getElementById('signup-privacypolicy');
    checkValidations(FORM_NAME.value, FORM_EMAIL.value, FORM_PASSWORD.value, FORM_CONFPASS.value, FORM_PRIVACYPOLICY);
}


function checkValidations(name, email, password, confpass, privacypolicy) {
    let validity = 0;
    validity += checkValidationName(name) * 1;
    console.log('validity: ', validity);

    validity += isValidEmail(email) * 1;
    console.log('validity: ', validity);

    validity += ((password != '') && (password === confpass) ? true : false) * 1;
    console.log('validity: ', validity);

    validity += privacypolicy.checked * 1;
    console.log('validity: ', validity);
    console.log('----------');
}


function checkValidationName(input) {
    let wordlist = input.split(/\s+/);
    return wordlist.length > 1 ? true : false;
}


function isValidEmail(input) {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/;
    return emailRegex.test(input);
}

/**
 * Displays password requirements for a short time.
 */
function showPasswordRequirements() {
    document.getElementById("passwordInfo").classList.remove('d-none');
  
    setTimeout(function () {
      document.getElementById("passwordInfo").classList.add('d-none');
    }, 4000);
}
  


function validConfirmPassword(inputpass, inputconfirm) {
    let elemPassword = document.getElementById(inputpass);
    let elemConfirm = document.getElementById(inputconfirm);
    if(elemPassword.value !== elemConfirm.value) {

    }
}


