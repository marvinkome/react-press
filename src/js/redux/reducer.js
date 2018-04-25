/**
 * ./src/js/redux/reducer.js
 */

import initialState from './initialState';
import * as constants from './constants';

// Utility functions
const updateObject = (oldObj, newValues) => {
    return Object.assign({}, oldObj, newValues);
};

const updateItemArray = (array, itemId, callback, key = 'id') => {
    const updatedItems = array.map(item => {
        if (item[key] !== itemId) {
            return item;
        }

        const updatedItem = callback(item);
        return updatedItem;
    });

    return updatedItems;
};

const saveToStore = (store, key) => {
    if (localStorage) {
        store = JSON.stringify(store);
        localStorage.setItem(key, store);
    }

    return true;
};

// Case reducers
const sendRequest = state => {
    const isFetching = true;
    return updateObject(state, {
        isFetching
    });
};

const sendCommentRequest = state => {
    const isSendingComment = true;
    return updateObject(state, {
        isSendingComment
    });
};

const sendClapRequest = state => {
    const isClapping = true;
    return updateObject(state, {
        isClapping
    });
};

const requestFinished = state => {
    const isFetching = false;
    return updateObject(state, {
        isFetching
    });
};

const requestCommentFinished = state => {
    const isSendingComment = false;
    return updateObject(state, {
        isSendingComment
    });
};

const requestClapFinished = (state, clap, data) => {
    const isClapping = false;

    const new_state = updateObject(state, {
        isClapping,
        post_data: updateObject(state.post_data, {
            posts: updateItemArray(
                state.post_data.posts,
                data.post_id,
                post =>
                    updateObject(post, {
                        claps: updateObject(post.claps, {
                            edges: post.claps.edges.concat({
                                node: {
                                    id: clap.id
                                }
                            })
                        })
                    }),
                'uuid'
            )
        })
    });

    return new_state;
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

const recieveArticle = (state, article) => {
    const isFetching = false;
    const lastFetch = Date.now();
    const new_post = state.post_data.posts.concat(article.data.post);
    const post_data = updateObject(state.post_data, {
        posts: new_post
    });
    const store = updateObject(state, {
        isFetching,
        lastFetch,
        post_data
    });

    return store;
};

const loginUser = (state, token) => {
    const isFetching = false;
    let isLoggedIn = false;

    if (token.access_token != null) {
        isLoggedIn = true;
        saveToStore(true, 'med-blog-logged-in');
        saveToStore(token.access_token, 'med-blog-access-token');
    }

    return updateObject(state, {
        isFetching,
        isLoggedIn
    });
};

const recieveUserData = (state, user_data) => {
    const lastFetch = Date.now();
    const isFetching = false;
    const store = updateObject(state, {
        isFetching,
        lastFetch,
        user_data
    });

    return store;
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.SEND_REQUEST:
        return sendRequest(state);
    case constants.SEND_COMMENT:
        return sendCommentRequest(state);
    case constants.SEND_CLAP:
        return sendClapRequest(state);
    case constants.RECIEVE_ARTICLES:
        return recieveArticles(state, action.payload);
    case constants.RECIEVE_ARTICLE:
        return recieveArticle(state, action.payload);
    case constants.LOGIN_USER:
        return loginUser(state, action.payload);
    case constants.RECIEVE_USER_DATA:
        return recieveUserData(state, action.payload);
    case constants.REQUEST_FINISHED:
        return requestFinished(state);
    case constants.REQUEST_COMMENT_FINISHED:
        return requestCommentFinished(state);
    case constants.REQUEST_CLAP_FINISHED:
        return requestClapFinished(state, action.clap, action.data);
    default:
        return state;
    }
};

export default rootReducer;
