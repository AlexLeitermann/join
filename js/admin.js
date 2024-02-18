document.addEventListener('DOMContentLoaded', async function () {
    await initAdmin();
});

let users = [];
let contacts = [];
let tasks = [];
let board = [];
let lastUserId = 0;
let lastContactId = 0;
let lastTaskId = 0;


async function initAdmin() {
    await loadFromOnlineStorage();
    checkLastContactId();
    checkLastTaskId();
    checkLastUserId();
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


// ##############################################################################################################
async function logUsers() {
    await initAdmin();
    console.log('Users:', lastUserId, users);
}


async function logContacts() {
    const id = document.getElementById('contactId');
    if(id.value < 0) {
        await initAdmin();
        console.log('Contacts:', lastContactId, contacts);
    } else {
        await loadFromOnlineStorage(id.value);
        checkLastContactId();
        console.log(`Contact-id${id.value}`, lastContactId, contacts);
    }
}


async function logTasks() {
    const id = document.getElementById('taskId');
    if(id.value < 0) {
        await initAdmin();
        console.log('Tasks:', lastTaskId, tasks);
    } else {
        await loadFromOnlineStorage(id.value);
        checkLastTaskId();
        console.log(`Task-id${id.value}`, lastTaskId, tasks);
    }
}


async function logBoard() {
    const id = document.getElementById('boardId');
    if(id.value < 0) {
        await initAdmin();
        console.log('Board:', lastTaskId, tasks);
    } else {
        await loadFromOnlineStorage(id.value);
        checkLastTaskId();
        console.log(`Board-id${id.value}`, lastTaskId, tasks);
    }
}


// ##############################################################################################################
async function resetUsers() {
    console.log('Clear Users:', await saveData('users', []));
}


async function resetContacts() {
    const id = document.getElementById('contactId');
    if(id.value < 0) {
        console.log('Clear Contacts:', await saveData('contacts', []));
    } else {
        console.log(`Delete Contact-id${id.value}:`, await deleteData('contacts-id'+id.value));
    }
}


async function resetTasks() {
    const id = document.getElementById('taskId');
    if(id.value < 0) {
        console.log('Clear Tasks:', await saveData('tasks', []));
    } else {
        console.log(`Delete Tasks-id${id.value}:`, await deleteData('tasks-id'+id.value));
    }
}


async function resetBoard() {
    const id = document.getElementById('boardId');
    if(id.value < 0) {
        console.log('Clear Board:', await saveData('board', []));
    } else {
        console.log(`Delete Board-id${id.value}:`, await deleteData('board-id'+id.value));
    }
}


// ##############################################################################################################
function changeContactID() {
    const id = document.getElementById('contactId').value;
    if(id == -1) {
        document.getElementById('statusContact').innerHTML = `Guest`;
        document.getElementById('btn-reset-contact').innerHTML = `Erase`;
    } else {
        document.getElementById('statusContact').innerHTML = `ID: ${id}`;
        document.getElementById('btn-reset-contact').innerHTML = `Delete`;
    }
}


function changeTaskID() {
    const id = document.getElementById('taskId').value;
    if(id == -1) {
        document.getElementById('statusTask').innerHTML = `Guest`;
        document.getElementById('btn-reset-task').innerHTML = `Erase`;
    } else {
        document.getElementById('statusTask').innerHTML = `ID: ${id}`;
        document.getElementById('btn-reset-task').innerHTML = `Delete`;
    }
}


function changeBoardID() {
    const id = document.getElementById('boardId').value;
    if(id == -1) {
        document.getElementById('statusBoard').innerHTML = `Guest`;
        document.getElementById('btn-reset-board').innerHTML = `Erase`;
    } else {
        document.getElementById('statusBoard').innerHTML = `ID: ${id}`;
        document.getElementById('btn-reset-board').innerHTML = `Delete`;
    }
}


function changeAdminID() {
    const id = document.getElementById('adminId').value;
    document.getElementById('statusAdmin').innerHTML = `ID: ${id}`;
}


// ##############################################################################################################


async function deleteAdmin() {
    await initAdmin();
    const id = +document.getElementById('adminId').value;
    const index = idToIndex(id, users);
    delete users[index].admin;
    console.log('Delete Admin:', saveData('users', users));
}


async function setAdmin() {
    await initAdmin();
    const id = +document.getElementById('adminId').value;
    const index = idToIndex(id, users);
    console.log('id, index:', id, index);
    users[index].admin = 1;
    console.log('Set Admin:', index,  saveData('users', users));
}



