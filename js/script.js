const active = 'active';
document.addEventListener('DOMContentLoaded', async function () {
    await init();
});
document.addEventListener('click', function() {
    if (document.getElementById('useroptions')) {
        const obj = document.getElementById('useroptions');
        if (obj.classList.contains('inview')) {
            obj.classList.remove('inview');
        } 
    }
});


/**
 * Function is called after the page has fully loaded and calls important functions for the page.
 */
async function init() {
    await includeHTML();
    if(isLoadUserLogin !== false) {
        initLoggedInUser();        
    }
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


function stopPropagation(event) {
    console.log(event);
    event.stopPropagation();
}


/**
 * Helper function: Sorts an array of Json objects alphabetically by the initials of the contacts.
 * 
 * @param {Array} arr - The array to sort.
 * @returns - Returns a sorted copy.
 */
function sortContacts(arr) {
    let targetArr = [...arr];
    targetArr.sort((c1, c2) => (c1.initials < c2.initials ? -1 : c1.initials > c2.initials ? 1 : 0));
    return targetArr;
}


/**
 *  Helper function: Sorts an array upwards by id.
 * 
 * @param {Array} arr - The array to sort.
 * @returns - Returns a sorted copy.
 */
function sortIds(arr) {
    let targetArr = [...arr];
    targetArr.sort((c1, c2) => (c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0));
    return targetArr;
}


function checkLastUserId() {
    if(users.length > 0) {
        let tempUsers = sortIds(users);
        lastUserId = tempUsers[tempUsers.length - 1].id;
    } else {
        lastUserId = 0;
    }
}


function checkLastContactId() {
    if(contacts.length > 0) {
        let tempContacts = sortIds(contacts);
        lastContactId = tempContacts[tempContacts.length - 1].id;
    } else {
        lastContactId = 0;
    }
}


function checkLastTaskId() {
    if(tasks.length > 0) {
        let tempTasks = sortIds(tasks);
        lastTaskId = tempTasks[tempTasks.length - 1].id;
    } else {
        lastTaskId = 0;
    }
}


async function calcHash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


/**
 * Search the id in Array and returns index
 * 
 * @param {number} id - field in Array
 * @param {Array} arr - Array with contacts or users
 * @returns - index in Array
 */
function idToIndex(id, arr = users) {
    return arr.findIndex( item => item.id === id);
}


/**
 * Search the password in Array and returns index
 * 
 * @param {number} id - field in Array
 * @param {Array} arr - Array with contacts or users
 * @returns - index in Array
 */
function passwordToIndex(password, arr = users) {
    return arr.findIndex(function (item, i) {
        return item.password === password;
    });
}


/**
 * Returns two letters from a String. If String contains a word, two letters of that word are returned.
 * If String contains two words, one letter from each of the first two words is returned. 
 * 
 * @param {string} string - from a name-field
 * @returns - two letters
 */
function initialsFrom(string) {
    let wordlist = string.split(" ");
    let words = wordlist.length;
    let result = "--";
    if (words == 1) {
        result = wordlist[0][0];
        result += wordlist[0].length > 1 ? wordlist[0][1] : "-";
    } else if (words > 1) {
        result = wordlist[0][0] + wordlist[1][0];
    }
    return result.toUpperCase();
}


/**
 * Function for escaping characters in HTML text.
 * 
 * @param {string} string - Text in which the special characters are to be replaced.
 * @returns - The finished text.
 */
function maskSpecialChars(string) {
    const specialChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
    return string.replace(/[&<>"']/g, char => specialChars[char]);
}




