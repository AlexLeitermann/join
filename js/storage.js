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
        return false;
    }
}


/**
 * Gets an item from remote storage.
 * @param {string} 
 * @returns {Promise} 
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
 * @param {string} 
 * @param {any} 
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
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




