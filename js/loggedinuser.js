let cuid = +getSessionData("cuid");
let cuname = getSessionData("cuname");
let cuinitials = getSessionData("cuinitials");
let isNotAUser = true;


/**
 * Checks for user data in local storage and redirects to the home page if missing.
 */
if(!cuid || !cuname || !cuinitials) {
    sessionStorage.removeItem("cuid");
    sessionStorage.removeItem("cuname");
    sessionStorage.removeItem("cuinitials");
    let comeFrom = document.location.pathname;
    if (!comeFrom.includes("legal_notice.html") && !comeFrom.includes("privacy_policy.html")) {
        window.location.href = 'index.html';
    }
} else {
    isNotAUser = false;
    // initLoggedInUser();
}


