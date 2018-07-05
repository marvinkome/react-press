import { updateObject } from './utils';
import { saveToStore } from '../../lib/storage';
import { tokenKey, loggedInKey } from '../../keys/storage';
import jsCookie from 'js-cookie';

// auth requests
export const loginUser = (state, res) => {
    const isLoggingIn = false;

    if (res.login != undefined && res.login == true) {
        // set token in localstorage
        saveToStore(true, loggedInKey);
        const refresh_token = res.refresh_token;
        saveToStore(refresh_token, tokenKey);

        // set token in cookie for server side
        jsCookie.set(tokenKey, res.refresh_token);
        jsCookie.set(loggedInKey, true);
    }

    return updateObject(state, {
        isLoggingIn
    });
};

export const logoutUser = (state, logout) => {
    if (logout == true) {
        // remove token in local storage
        saveToStore(false, loggedInKey);
        saveToStore('', tokenKey);

        // set token in cookie for server side
        jsCookie.set(tokenKey, '');
        jsCookie.set(loggedInKey, false);

        return updateObject(state, {
            user_data: {}
        });
    }

    return {};
};

export const recieveUserData = (state, user_data) => {
    const lastFetch = Date.now();
    const isFetching = false;

    const store = updateObject(state, {
        isFetching,
        lastFetch,
        user_data
    });

    return store;
};
