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
        document.getElementById('addcontact-name').value = '';
        document.getElementById('addcontact-email').value = '';
        document.getElementById('addcontact-phone').value = '';
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
function renderContactList(activeID = null) {
    let newContent = "", firstLetter = "";
    for (let i = 0; i < contactsSorted.length; i++) {
        let you = isCurrentUserInfo(contactsSorted[i].userid);
        let answer = nextLetter(contactsSorted[i].initials[0], firstLetter);
        firstLetter = answer[1];
        newContent += answer[0];
        newContent += renderListEntry(i, you, contactsSorted[i].id == activeID ? true : false);
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
 * @param {number} you - The additional text from the function isCurrentUserInfo
 * @returns - Returns HTML code to render.
 */
function renderListEntry(i, you = "", isActive = false) {
    let setActive = isActive ? ` ${active}` : "";
    return `
        <div id="contactlist-itembox-${contactsSorted[i].id}" class="contactlist-itembox${setActive}" onclick="openContact(${contactsSorted[i].id}, event)">
            <div>
                <div class="contactlist-itembox-badge">
                    <div class="contactlist-itembox-badge-circle bdg-${contactsSorted[i].badgecolor}">
                        <span class="contactlist-itembox-badge-text">${contactsSorted[i].initials}</span>
                    </div>
                </div>
            </div>
            <div class="contactlist-itembox-namebox">
                <span class="contactlist-itembox-name">${contactsSorted[i].name}${you}</span>
                <span class="contactlist-itembox-mail">${contactsSorted[i].email}</span>
            </div>
        </div>
    `;
}
  

// ############################################################
// ############################################################
// ############################################################
// Contact Detail View
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

    document.getElementById("contactview-options").innerHTML = renderSingleViewOptions(id);
}


function renderSingleViewOptions(id) {
    return `
        <button id="contact-edit" class="contact-options" onclick="editContactPopup(${id})">
            <img src="./img/icon_edit_main.png"><span>Edit</span>
        </button>
        <button id="contact-delete" class="contact-options" onclick="deleteContact(${id})">
            <img src="./img/icon_delete_main.png"><span>Delete</span>
        </button>
    `;
}


// ############################################################
// ############################################################
// ############################################################
// ADD Contact




// ############################################################
// ############################################################
// ############################################################
// Edit Contact
function editContactPopup(id) {
    let index = idToIndex(id, contactsSorted);
    document.getElementById("editBadge120-text").innerHTML = contactsSorted[index].initials;
    document.getElementById("editBadge120").className = `badge-120 bdg-${contactsSorted[index]["badgecolor"]}`;
    document.getElementById("editcontact-id").value = contactsSorted[index].id;
    document.getElementById("editcontact-name").value = contactsSorted[index].name;
    document.getElementById("editcontact-email").value = contactsSorted[index].email;
    document.getElementById("editcontact-phone").value = contactsSorted[index].phone;
    document.getElementById("editcontact-content-actionbox").innerHTML = `
        <button type="button" class="btn-secondary" id="editcontact-delete-btn" onclick='deleteContact(${id})'><span>Delete</span></button>
        <button type="submit" class="btn-primary"><span>Save</span><img src="./img/icon_chk_btn_wh.png"></button>
    `;
    document.getElementById('editcontact-main').classList.toggle(active);
}


/**
 * 
 */
function deleteContact() {
    let id = +document.getElementById("editcontact-id").value;
    console.log('Delete Contact now', id);
}


/**
 * 
 */
async function saveEditContact() {
    let id = +document.getElementById("editcontact-id").value;
    let index = idToIndex(id, contacts);
    await updateContactFields(index);
    updateSessionStorage(index);
    contactsSorted = sortContacts(contacts);
    renderSaveEditContact(id);
}


/**
 * Changes the contact details with the input from the form fields.
 * 
 * @param {number} index - Index for the contact details in the contact list
 */
async function updateContactFields(index) {
    contacts[index].name = document.getElementById("editcontact-name").value;
    contacts[index].initials = initialsFrom(document.getElementById("editcontact-name").value);
    contacts[index].email = document.getElementById("editcontact-email").value;
    contacts[index].phone = document.getElementById("editcontact-phone").value;
    if (cuid == -1 && cuname == 'Guest') {
        await saveData("contacts", contacts);
    } else if (cuid > -1) {
        await saveData("contacts-id"+cuid, contacts);
    }
    // await updateUserFields(index);
}


/**
 * If contact is also a user, update the user details too.
 * 
 * @param {number} index - Index for the contact details in the contact list
 */
async function updateUserFields(index) {
    let userIndex = idToIndex(contacts[index].userid, users);
    if(isCurrentUser(contacts[index].userid)) {
        users[userIndex].name = contacts[index].name;
        users[userIndex].initials = contacts[index].initials;
        users[userIndex].email = contacts[index].email;
        users[userIndex].phone = contacts[index].phone;
        await saveData("users", users);
    }
}


/**
 * Helper function: Checks the current user via the user ID.
 * 
 * @param {number} userId - Id for user
 * @returns - True or false.
 */
function isCurrentUser(userId) {
    return userId === cuid;
}


/**
 * Updated contact details can also be changed in LocalStorage for the logged in user.
 * 
 * @param {*} index - Index for the contact details in the contact list
 */
function updateSessionStorage(index) {
    sessionStorage.setItem('cuname', contacts[index].name);
    if(sessionStorage.getItem("rememberEmail")) {
        sessionStorage.setItem('rememberEmail', contacts[index].email);
    }
    sessionStorage.setItem('cuname', contacts[index].name);
    sessionStorage.setItem('cuinitials', contacts[index].initials);

    cuname = sessionStorage.getItem("cuname");
}


/**
 * After changing contact information, re-render all areas for it.
 * 
 * @param {number} id - Id of the selected contact.
 */
function renderSaveEditContact(id) {
    setHeaderBadge();
    renderContactList(id);
    renderSingleView(id);
    document.getElementById('editcontact-main').classList.remove(active);
    // openEditCon();
}



  
  