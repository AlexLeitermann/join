document.addEventListener('DOMContentLoaded', async function () {
    await init();
});


/**
 * Function is called after the page has fully loaded and calls important functions for the page.
 */
async function init() {
    await includeHTML();
}


/**
 * Function for reloading templates.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
        } else {
            element.innerHTML = 'Page not found';
        }
        element.removeAttribute("w3-include-html");
    }
}


function browserBack() {
    history.back();
}