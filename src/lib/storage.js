import jsHttpCookie from 'cookie';
import jsCookie from 'js-cookie';

export const saveToStore = (value, key) => {
    if (window.localStorage) {
        value = JSON.stringify(value);
        window.localStorage.setItem(key, value);
        return true;
    }

    return false;
};

export const removeFromStore = (key) => {
    if (window.localStorage) {
        window.localStorage.removeItem(key);
        return true;
    }

    return false;
};

export const getFromStore = (key) => {
    let value = null;

    if (window.localStorage) {
        value = JSON.parse(window.localStorage.getItem(key));
    }

    return value;
};

export const getCookie = (req, key) => {
    if (req && req.headers) {
        const httpCookies = req.headers.cookie;
        if (typeof httpCookies === 'string') {
            const cookies = jsHttpCookie.parse(httpCookies);
            return cookies[key];
        }
    }
};

export const saveCookie = (key, value) => {
    jsCookie.set(key, value);
    return true;
};

export const removeCookie = (key) => {
    jsCookie.remove(key);
    return true;
};
