import { updateObject } from './utils';
import { removeFromStore, saveToStore } from '../../lib/storage';

// auth requests
export const loginUser = (state, res) => {
    const isLoggingIn = false;

    if (res.login != undefined && res.login == true) {
        saveToStore(true, 'med-blog-logged-in');
        const refresh_token = res.refresh_token;
        saveToStore(refresh_token, 'med-blog-ref');
    }

    return updateObject(state, {
        isLoggingIn
    });
};

export const logoutUser = (state, logout) => {
    if (logout == true) {
        saveToStore(false, 'med-blog-logged-in');
        removeFromStore('med-blog-ref');
    }

    return updateObject(state, {
        user_data: {}
    });
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
