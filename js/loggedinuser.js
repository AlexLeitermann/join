let cuid = +getSessionData("cuid");
let cuname = maskSpecialChars(getSessionData("cuname"));
let cuinitials = maskSpecialChars(getSessionData("cuinitials") || '');
let isNotAUser = true;

/**
 * Checks for user data in local storage and redirects to the home page if missing.
*/
if(!cuid || !cuname || !cuinitials) {
    sessionStorage.removeItem("cuid");
    sessionStorage.removeItem("cuname");
    sessionStorage.removeItem("cuinitials");
    let comeFrom = document.location.pathname;
    if (!comeFrom.includes("legalnotice.html") && !comeFrom.includes("privacypolicy.html")) {
        window.location.href = 'index.html';
    }
} else {
    isNotAUser = false;
}

isLoadUserLogin = true;

function initLoggedInUser() {
    setHeaderBadge();
}


function setHeaderBadge() {
    let element = document.getElementById('header-main-user-initials');
    element.innerHTML = cuinitials;
}


/**
 * Opens or closes the user's options menu.
 * 
 * @param {boolean} close - If it is true, the options menu will always close.
 */
function useroptions(close = false) {
    let obj = document.getElementById('useroptions');
    close ? obj.classList.remove('inview') : obj.classList.toggle('inview');
}


/**
 * Logs the user out.
 */
function userLogout() {
    sessionStorage.removeItem("cuid");
    sessionStorage.removeItem("cuname");
    sessionStorage.removeItem("cuinitials");
    window.location.href = "index.html";
}




