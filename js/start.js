document.addEventListener('DOMContentLoaded', async function () {
    await initStart();
});

let users = [];
let contacts = [];
let tasks = [];
let lastContactId = 0;
let lastUserId = 0;
let lastTaskId = 0;


async function initStart() {
    await loadFromOnlineStorage();
    checkLastUserId();
    // if Remember me = true

}


async function loadFromOnlineStorage() {
    users = await returnJsonAtLoadData('users');
    // contacts = await returnJsonAtLoadData('contacts');
    // tasks = await returnJsonAtLoadData('tasks');
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
    passwordfield.type == "password" ? passwordfield.type = "text" : passwordfield.type = "password"; 
    passwordfield.focus();
}


// ################################################################################
function signup() {
    const FORM_NAME = document.getElementById('signup-username');
    const FORM_EMAIL = document.getElementById('signup-email');
    const FORM_PASSWORD = document.getElementById('signup-password');
    const FORM_CONFPASS = document.getElementById('signup-confirm-password');
    const FORM_PRIVACYPOLICY = document.getElementById('signup-privacypolicy');
    if(checkValidations(FORM_NAME.value, FORM_EMAIL.value, FORM_PASSWORD.value, FORM_CONFPASS.value, FORM_PRIVACYPOLICY) == 63) {
        // alles ok
        console.log('OK');
        createNewUser(FORM_NAME.value, FORM_EMAIL.value, FORM_PASSWORD.value);
    } else {
        // es fehlt was
        console.log('NOT');
        // signupError(checkValidations(FORM_NAME.value, FORM_EMAIL.value, FORM_PASSWORD.value, FORM_CONFPASS.value, FORM_PRIVACYPOLICY));
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
    console.log('Checks:', validity);
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
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[äöüÄÖÜß!@#$%^&*+\-])[a-zA-Z0-9äöüÄÖÜß!@#$%^&*+\-]{8,128}$/;
    return passwordRegex.test(input);
}


function isAccountUnset(email) {
    let result = true;
    if(users.length > 0) {
        users.forEach( (user) => {
            if(user.email == email) {
                result = false;
            }
        } );
    }
    return result;
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
  

/**
 * Displays confirm password requirements for a short time.
 */
function showConfirmPasswordRequirements() {
    document.getElementById("passwordConfirmInfo").classList.remove('d-none');
  
    setTimeout(function () {
      document.getElementById("passwordConfirmInfo").classList.add('d-none');
    }, 4000);
}
  


function validConfirmPassword(inputpass, inputconfirm) {
    let elemPassword = document.getElementById(inputpass);
    let elemConfirm = document.getElementById(inputconfirm);
    if(elemPassword.value !== "" && elemPassword.value !== elemConfirm.value) {
        showConfirmPasswordRequirements();
        return false;
    }
    return true;
}


// ################################################################################
// ################################################################################
// ################################################################################
async function createNewUser(newName, newEmail, newPassword) {
    let answer = 0;
    let hashPassword = '';
    lastUserId++;
    lastContactId++;
    await calcHash(newPassword).then( (passHex) => hashPassword = passHex );
    console.log(newPassword+':', hashPassword);
    let dataSet1 = newDatasetUser(newName, newEmail, hashPassword);
    let dataSet2 = newDatasetContact(newName, newEmail);

    users.push(dataSet1[0]);
    contacts.push(dataSet2[0]);

    answer += (await saveData('users', users)) * 1;
    answer += (await saveData('contacts-id' + lastUserId, contacts)) * 2;
    answer += (await saveData('tasks-id' + lastUserId, tasks)) * 4;
    console.log('createNewUser:', answer);
}


function newDatasetUser(newName, newEmail, newPassword) {
    return [
        {
            "id": lastUserId,
            "name": newName,
            "initials": initialsFrom(newName),
            "contactid": lastContactId,
            "email": newEmail,
            "password": newPassword
        },
    ];
}


function newDatasetContact(newName, newEmail) {
    return [
        {
            "id": lastContactId,
            "userid": lastUserId,
            "assigned": lastUserId,
            "name": newName,
            "initials": initialsFrom(newName),
            "email": newEmail,
            "phone": "Please set the Phonenumber.",
            "badgecolor": randomBadgeColor()
        },
    ];
}


/**
 * Generates a random number from 0 to 14 for the color of the badge
 * 
 * @returns Number 0 to 14
 */
function randomBadgeColor() {
    return Math.floor(Math.random() * 15);
}


// ################################################################################
// ################################################################################
// ################################################################################
/**
 * Funktion zum Verarbeiten des Login-Formulars.
 * 
 * @param {Event} event - Das Event-Objekt.
 */
function btnLogin(event) {
    event.preventDefault();
    const clickedButton = event.submitter;
    if (clickedButton && clickedButton.name === 'userLogin') {
        userLogin();
    } else if (clickedButton && clickedButton.name === 'guestLogin') {
        theGuestLogin();
    }
}


async function userLogin() {
    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-password').value;
    let hashPassword = '';
    await calcHash(loginPassword).then( (passHex) => hashPassword = passHex );
    let currentUser = authenticateUser(users, loginEmail, hashPassword);
    if(currentUser) {
        setSessionData('cuid', currentUser.id);
        setSessionData('cuname', currentUser.name);
        setSessionData('cuinitials', currentUser.initials);
        // Benutzer gefunden und eingeloggt
        window.location.href = 'summary.html';
    } else {
        // Benutzer nicht gefunden
        console.log('User not found.');
    }
}


async function theGuestLogin() {
    setSessionData('cuid', -1);
    setSessionData('cuname', 'Guest');
    setSessionData('cuinitials', 'G');
    window.location.href = 'summary.html';
}



function getIDfromUserLogin(password) {
    if(users.length < 0) {
        return null;
    } else {
        let index = passwordToIndex(password, users);
        setSessionData('cuid', [users[index].id]);
        setSessionData('cuname', users[index].name);
        setSessionData('cuinitials', users[index].initials);
    }
}


/**
 * Authenticates a user based on email and password.
 * @param {Array} arr
 * @param {string} email
 * * @param {string} password
 */
function authenticateUser(arr, email, password) {
    return arr.find(
        (element) => element.email === email && element.password === password
    );
}





