export const saveToStore = (store, key) => {
    if (window.localStorage) {
        store = JSON.stringify(store);
        window.localStorage.setItem(key, store);
    }

    return true;
};

export const removeFromStore = (key) => {
    if (window.localStorage) {
        window.localStorage.removeItem(key);
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
