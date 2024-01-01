let activeContactItem = null;



function openContact(id = -1, event) {
    if(event.target === event.currentTarget || event.currentTarget.id.search('contactlist-itembox-') != -1) {
        openContactClearActive();
        if(id != -1) {
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
        <div class="contact-letterbox">
            <span class="contact-letter">${letter}</span>
        </div>
        <div class="contact-hr"></div>
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
        <div id="contactlist-itembox-${sortedContactList[i].id}" class="contactlist-itembox" onclick="openContact(${sortedContactList[i].id})">
            <div">
                <div class="contactlist-itembox-badge">
                    <div class="contactlist-itembox-badge-circle bdg-${sortedContactList[i]["badge-color"]}">
                        <span class="contactlist-itembox-badge-text">${sortedContactList[i].initials}</span>
                    </div>
                </div>
            </div>
            <div class="contactlist-itembox-namebox">
                <span class="contactlist-itembox-name">${sortedContactList[i].name}${isUser}</span>
                <span class="contactlist-itembox-mail">${sortedContactList[i].email}</span>
            </div>
        </div>
    `;
}
  
  
  