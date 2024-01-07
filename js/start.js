document.addEventListener('DOMContentLoaded', async function () {
    await init();
});

let contacts = [];
let tasks = [];
let users = [];

async function init() {
    await loadFromOnlineStorage();
}


async function loadFromOnlineStorage() {
    contacts = await loadData('contacts');
    tasks = await loadData('tasks');
    users = await loadData('users');
}


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
        document.title = 'JOIN - Sign up';
    }
}

function closeIt(page) {
    let element = document.getElementById(page);
    element.classList.remove('inview');
    if(page == 'signup') {
        document.getElementById('login-email').focus();
        document.title = 'JOIN - Log in';
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
    if(checkValidations(FORM_NAME.value, FORM_EMAIL.value, FORM_PASSWORD.value, FORM_CONFPASS.value, FORM_PRIVACYPOLICY) == 63) {
        // alles ok
        createNewUser(FORM_NAME, FORM_EMAIL, FORM_PASSWORD);
    } else {
        // es fehlt was
        signupError(checkValidations(FORM_NAME.value, FORM_EMAIL.value, FORM_PASSWORD.value, FORM_CONFPASS.value, FORM_PRIVACYPOLICY));
    }
}


function checkValidations(name, email, password, confpass, privacypolicy) {
    let validity = 0;
    validity += checkValidationName(name) * 1;
    validity += isValidEmail(email) * 2;
    validity += ((password != '') && (password === confpass) ? true : false) * 4;
    validity += isValidPassword(password) * 8;
    validity += privacypolicy.checked * 16;
    validity += isAccountUnset(email) * 32;
    return validity;
}


function checkValidationName(input) {
    let wordlist = input.split(/\s+/);
    return wordlist.length > 1;
}


function isValidEmail(input) {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/;
    return emailRegex.test(input);
}


function isValidPassword(input) {
    // let passwordRegex = /^[a-zA-Z0-9äöüÄÖÜß!@#$%^&*+\-]{8,40}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[äöüÄÖÜß!@#$%^&*+\-])[a-zA-Z0-9äöüÄÖÜß!@#$%^&*+\-]{8,40}$/;
    return passwordRegex.test(input);
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


function isAccountUnset(email) {
    
}


