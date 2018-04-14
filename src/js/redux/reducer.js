/**
 * ./src/js/redux/reducer.js
 */

import initialState from './initialState';
import * as constants from './constants';

// Utility functions
const updateObject = (oldObj, newValues) => {
    return Object.assign({}, oldObj, newValues);
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
const requestArticle = state => {
    const isFetching = true;
    return updateObject(state, {
        isFetching
    });
};

const recieveArticle = (state, article) => {
    const isFetching = false;
    const lastFetch = Date.now();

    return updateObject(state, {
        isFetching,
        lastFetch,
        data: article.posts
    });
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.REQUEST_ARTICLE:
        return requestArticle(state);
    case constants.RECIEVE_ARTICLE:
        return recieveArticle(state, action.payload);
    default:
        return state;
    }
};

export default rootReducer;
