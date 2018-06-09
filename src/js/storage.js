export const saveToStore = (store, key) => {
    if (localStorage) {
        store = JSON.stringify(store);
        localStorage.setItem(key, store);
    }

    return true;
};

export const removeFromStore = (key) => {
    if (localStorage) {
        localStorage.removeItem(key);
    }

    return true;
};

export const getFromStore = (key) => {
    let value = null;

    if (window.localStorage) {
        value = JSON.parse(window.localStorage.getItem(key));
    }

    return value;
};
