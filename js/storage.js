const STORAGE_TOKEN = 'WORBHPZTO20NMYS1WWXZ4CNR8Q8A9DP3WKJEXQ83';
const STORAGE_URL = 'https://storage.leitermann.online/index.php';

/**
 * Loads data from storage.
 * @param {string}
 * @returns {Promise} 
 */
async function loadData(key) {
    let loadedData = await getItem(key);
    if (loadedData == null) {
          return false;
    } else {
          return JSON.parse(loadedData);
    }
}


async function returnJsonAtLoadData(key) {
    let checkLoadData = await loadData(key);
    return checkLoadData == false ? [] : checkLoadData;
}


/**
 * Saves data to storage.
 * @param {string} - key
 * @param {any} - value
 * @returns {Promise} - boolean
 */
async function saveData(key, value) {
    let saveData = await setItem(key, JSON.stringify(value));
    if (saveData.status == "success") {
        return true;
    } else {
        console.log('storage.js - saveData() - error:', saveData.message);
        return false;
    }
}


/**
 * Saves data to storage.
 * @param {string} - key
 * @param {any} - value
 * @returns {Promise} - boolean
 */
async function deleteData(key) {
    let removeData = await deleteItem(key);
    if (removeData.status == "success") {
        return true;
    } else {
        console.log('storage.js - deleteData() - error:', removeData.message);
        return false;
    }
}


/**
 * Gets an item from remote storage.
 * @param {string} - key
 * @returns {Promise} - null or string
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
        .then(res => res.json())
            .then(res => {
                if (res && res.data) {
                    return res.data.value;
                }
            return null; 
        });
}


/**
 * Sets an item in remote storage.
 * @param {string} - key
 * @param {any} - value
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
    .then(res => res.json());
}


/**
 * Delete an item in remote storage.
 * @param {string} - key
 */
async function deleteItem(key) {
    const payload = { key, delete: '', token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
    .then(res => res.json());
}


function getLocalData(key) {
    return JSON.parse(localStorage.getItem(key));
}


function setLocalData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


function getSessionData(key) {
    return JSON.parse(sessionStorage.getItem(key));
}


function setSessionData(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}




