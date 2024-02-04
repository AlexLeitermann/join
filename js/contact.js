document.addEventListener("DOMContentLoaded", async function () {
    await initContacts();
});

let activeContactItem = null; // ???
let users = [];
let contacts = [];
let contactsSorted = [];
let tasks = [];
let board = [];
let lastUserId = 0;
let lastContactId = 0;
let lastTaskId = 0;

/**
 * Initializes required data
 */
async function initContacts() {
    if(isLoadUserLogin && !isNotAUser) {
        await loadFromOnlineStorage(cuid);
        checkLastContactId();
        checkLastTaskId();
        checkLastUserId();
        contactsSorted = sortContacts(contacts);
        renderContactList();
    }


    // ---------------------------------
    // if(isLoaded == false) {
    //     await userAndContacts();
    // }
    // await loadLastContactId();
    // sortedContactList = sortMyList(contactList);
    // let comeFrom = document.location.pathname;
    // if (comeFrom.includes("contacts.html")) {
    //     renderContactList();
    // }
}


async function loadFromOnlineStorage(id = -1) {
    users = await returnJsonAtLoadData('users');
    if(id == -1) {
        tasks = await returnJsonAtLoadData('tasks');
        contacts = await returnJsonAtLoadData('contacts');
        board = await returnJsonAtLoadData('board');
    } else {
        tasks = await returnJsonAtLoadData('tasks-id'+id);
        contacts = await returnJsonAtLoadData('contacts-id'+id);
        board = await returnJsonAtLoadData('board-id'+id);
    }
}



// ############################################################
// ############################################################
// ############################################################

function openContact(id = -1, event) {
    if(event.target === event.currentTarget || event.currentTarget.id.search('contactlist-itembox-') != -1) {
        openContactClearActive();
        if(id != -1) {
            renderSingleView(id);
            document.getElementById('contactview-main').classList.add(active);
            document.getElementById(`contactlist-itembox-${id}`).classList.add(active);
        }
    }
}


function openContactClearActive() {
    document.getElementById('contactview-main').classList.remove(active);
    let elem = document.getElementsByClassName('contactlist-itembox');
    Array.from(elem).forEach(element => {
        element.classList.remove(active);
    });
}


function newContactView(event) {
    const elem = event.target;
    const elemList = event.currentTarget;
    if(elem === elemList || elemList.id === "addcontact-head-close" || elemList.id === "addcontact-btn" || elemList.id === "addcontact-cancel-btn" ) {
        document.getElementById('addcontact-main').classList.toggle(active);
    }
}


function editContactView(event) {
    const elem = event.target;
    const elemList = event.currentTarget;
    if(elem === elemList || elemList.id === "editcontact-head-close" || elemList.id === "contact-edit" ) {
        document.getElementById('editcontact-main').classList.toggle(active);
    }
}






// ############################################################
// ----- Render-Funktionen für Contacts im Allgemeinen --------
// ############################################################
/**
 * Renders the collection of contacts.
 */
function renderContactList() {
    let newContent = "", firstLetter = "";
    for (let i = 0; i < contactsSorted.length; i++) {
        let isUser = isCurrentUserInfo(contactsSorted[i].userid);
        let answer = nextLetter(contactsSorted[i].initials[0], firstLetter);
        firstLetter = answer[1];
        newContent += answer[0];
        newContent += renderListEntry(i, isUser);
    }
    if (newContent == "") { newContent += renderLetterbox(); }
    document.getElementById("contact-list").innerHTML = newContent;
}


/**
 * Gets the additional text for users.
 * 
 * @param {number} userId - Id for user
 * @returns - Returns the additional text.
 */
function isCurrentUserInfo(userId) {
    if (userId === cuid) {
        return " (You)";
    } else {
        return "";
    }
}


/**
 * Checks the change of the next letter for the contacts listing.
 * 
 * @param {string} currentLetter - First letter of the current contact's initials.
 * @param {string} firstLetter - Current letter of the sorted collection.
 * @returns - Returns the new heading if the letter has changed.
 */
function nextLetter(currentLetter, firstLetter) {
    let newContent = "";
    if (currentLetter != firstLetter) {
        firstLetter = currentLetter;
        newContent += renderLetterbox(currentLetter);
    }
    return [newContent, firstLetter];
}


/**
 * Helper function: To render the heading for the new letter.
 * 
 * @param {string} letter - The new letter.
 * @returns - Returns the HTML text.
 */
function renderLetterbox(letter = "No Contacts") {
    return `
        <div class="contactlist-letterbox">
            <span class="contactlist-letter">${letter}</span>
        </div>
        <div class="contactlist-hr"></div>
    `;
  }
  
  
  /**
 * Compiles the HTML code for a contact's list entry.
 * 
 * @param {number} i - i = index number in the sorted contact list.
 * @param {number} isUser - The additional text from the function isCurrentUserInfo
 * @returns - Returns HTML code to render.
 */
function renderListEntry(i, isUser = "") {
    return `
        <div id="contactlist-itembox-${contactsSorted[i].id}" class="contactlist-itembox" onclick="openContact(${contactsSorted[i].id}, event)">
            <div>
                <div class="contactlist-itembox-badge">
                    <div class="contactlist-itembox-badge-circle bdg-${contactsSorted[i]["badgecolor"]}">
                        <span class="contactlist-itembox-badge-text">${contactsSorted[i].initials}</span>
                    </div>
                </div>
            </div>
            <div class="contactlist-itembox-namebox">
                <span class="contactlist-itembox-name">${contactsSorted[i].name}${isUser}</span>
                <span class="contactlist-itembox-mail">${contactsSorted[i].email}</span>
            </div>
        </div>
    `;
}
  

// ############################################################
// ############################################################
// ############################################################
/**
 * Renders the detailed view of a contact.
 * 
 * @param {number} id - Id for contact.
 */
function renderSingleView(id) {
    let index = idToIndex(id, contactsSorted);
    let isUser = isCurrentUserInfo(contactsSorted[index].userid);
    document.getElementById("contact-single-info-badge-text").innerHTML = contactsSorted[index].initials;
    document.getElementById("contact-single-info-name-text").innerHTML = contactsSorted[index].name + isUser;
    document.getElementById("contact-single-info-email-text").innerHTML = contactsSorted[index].email;
    document.getElementById("contact-single-info-phone-text").innerHTML = contactsSorted[index].phone;
    document.getElementById("contact-single-info-badge-circle").className = `badge-120 bdg-${contactsSorted[index]["badgecolor"]}`;
    // document.getElementById("options").innerHTML = renderOptions(id);
    // document.getElementById("contact-single-info-options").innerHTML = renderOptions(id);
}



  
  