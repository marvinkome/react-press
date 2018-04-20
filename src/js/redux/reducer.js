/**
 * ./src/js/redux/reducer.js
 */

import initialState from './initialState';
import * as constants from './constants';

// Utility functions
const updateObject = (oldObj, newValues) => {
    return Object.assign({}, oldObj, newValues);
};

const saveToStore = (store, key) => {
    if (localStorage) {
        store = JSON.stringify(store);
        localStorage.setItem(key, store);
    }

    return true;
};

// const updateItemArray = (array, itemId, callback, key = 'id') => {
//     const updatedItems = array.map(item => {
//         if (item[key] !== itemId) {
//             return item;
//         }

//         const updatedItem = callback(item);
//         return updatedItem;
//     });

//     return updatedItems;
// };

// Case reducers
const sendRequest = state => {
    const isFetching = true;
    return updateObject(state, {
        isFetching
    });
};

const recieveArticles = (state, article) => {
    const isFetching = false;
    const lastFetch = Date.now();

    const store = updateObject(state, {
        isFetching,
        lastFetch,
        post_data: article.data
    });

    return store;
};

const loginUser = (state, token) => {
    const isFetching = false;
    let isLoggedIn = false;
    if (token.access_token != null) {
        isLoggedIn = true;
        saveToStore(token.access_token, 'med-blog-access-token');
    }

    return updateObject(state, {
        isFetching,
        isLoggedIn
    });
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.SEND_REQUEST:
        return sendRequest(state);
    case constants.RECIEVE_ARTICLES:
        return recieveArticles(state, action.payload);
    case constants.LOGIN_USER:
        return loginUser(state, action.payload);
    default:
        return state;
    }
};

export default rootReducer;
