/**
 * ./src/js/redux/reducer.js
 */

import initialState from './initialState';
import * as constants from './constants';

// Utility functions
const updateObject = (oldObj, newValues) => {
    return Object.assign({}, oldObj, newValues);
};

const updateNestedItemArray = (array, itemId, callback, key = 'id') => {
    const updatedItems = array.map((item) => {
        if (item['node'][key] !== itemId) {
            return item;
        }

        const updatedItem = callback(item);
        return updatedItem;
    });

    return updatedItems;
};

const removeItemInNestedArray = (array, itemId, key = 'id') => {
    let selected_item = array.find(
        (item) => item['node'][key] == itemId
    );

    return array.filter((item) => item !== selected_item);
};

const removeDuplicateInArray = (propertyName, inputArray, duplicateKey) => {
    let duplicate = false;

    inputArray.map( item => {
        if(item[propertyName] === duplicateKey){
            delete item[propertyName];
            duplicate = true;
        }
    });

    return duplicate;
};

const saveToStore = (store, key) => {
    if (localStorage) {
        store = JSON.stringify(store);
        localStorage.setItem(key, store);
    }

    return true;
};

const removeFromStore = (key) => {
    if (localStorage) {
        localStorage.removeItem(key);
    }

    return true;
};

// Case reducers
// Before request is complete
const sendRequest = (state) => {
    const isFetching = true;
    return updateObject(state, {
        isFetching
    });
};

const sendloginRequest = (state) => {
    const isLoggingIn = true;
    return updateObject(state, {
        isLoggingIn
    });
};

const sendCommentRequest = (state) => {
    const isSendingComment = true;
    return updateObject(state, {
        isSendingComment
    });
};

const sendClapRequest = (state) => {
    const isClapping = true;
    return updateObject(state, {
        isClapping
    });
};

// After request is complete
// admin requests
const requestTagsFinished = (state, tag_post, post_id) => {
    const isFetching = false;
    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            post_id,
            (post) =>
                updateObject(post, {
                    node: {
                        ...tag_post
                    }
                }),
            'uuid'
        )
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: updateNestedItemArray(
                        state.user_data.data.user.posts.edges,
                        post_id,
                        (post) =>
                            updateObject(post, {
                                node: {
                                    ...tag_post
                                }
                            }),
                        'uuid'
                    )
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isFetching,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

const requestPostsFinished = (state, post) => {
    const isFetching = false;
    const new_post = updateObject(state.post_data, {
        posts: state.post_data.posts.concat({
            node: {
                ...post
            }
        })
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: state.user_data.data.user.posts.edges.concat(
                        {
                            node: {
                                ...post
                            }
                        }
                    )
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isFetching,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

const requestEditPostFinished = (state, post, post_id) => {
    const isFetching = false;

    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            post_id,
            (selected_post) =>
                updateObject(selected_post, {
                    node: {
                        ...post
                    }
                }),
            'uuid'
        )
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: updateNestedItemArray(
                        state.user_data.data.user.posts.edges,
                        post_id,
                        (selected_post) =>
                            updateObject(selected_post, {
                                node: {
                                    ...post
                                }
                            }),
                        'uuid'
                    )
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isFetching,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

const requestDeletePostFinished = (state, post_id) => {
    const isFetching = false;

    const new_post = updateObject(state.post_data, {
        posts: removeItemInNestedArray(
            state.post_data.posts,
            post_id,
            'uuid'
        )
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: removeItemInNestedArray(
                        state.user_data.data.user.posts.edges,
                        post_id,
                        'uuid'
                    )
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isFetching,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

const requestUserEditFinished = (state) => {
    return updateObject(state, {
        isFetching: false
    });
};

// Post requests
const requestCommentFinished = (state, post, comment, data) => {
    const isSendingComment = false;

    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            data.post_id,
            (selected_post) =>
                updateObject(selected_post, {
                    node: {
                        ...post
                    }
                }),
            'uuid'
        )
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: updateNestedItemArray(
                        state.user_data.data.user.posts.edges,
                        data.post_id,
                        (selected_post) =>
                            updateObject(selected_post, {
                                node: {
                                    ...post
                                }
                            }),
                        'uuid'
                    )
                }),
                comments: updateObject(
                    state.user_data.data.user.comments,
                    {
                        edges: state.user_data.data.user.comments.edges.concat(
                            {
                                node: {
                                    ...comment
                                }
                            }
                        )
                    }
                )
            })
        })
    });

    const new_state = updateObject(state, {
        isSendingComment,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

const requestCommentReplyFinished = (state, post, comment_rep, data) => {
    const isSendingComment = false;

    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            data.post_id,
            (selected_post) =>
                updateObject(selected_post, {
                    node: {
                        ...post
                    }
                }),
            'uuid'
        )
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: updateNestedItemArray(
                        state.user_data.data.user.posts.edges,
                        data.post_id,
                        (selected_post) =>
                            updateObject(selected_post, {
                                node: {
                                    ...post
                                }
                            }),
                        'uuid'
                    )
                }),
                commentReplies: updateObject(
                    state.user_data.data.user.commentReplies,
                    {
                        edges: state.user_data.data.user.commentReplies.edges.concat(
                            {
                                node: {
                                    ...comment_rep
                                }
                            }
                        )
                    }
                )
            })
        })
    });

    const new_state = updateObject(state, {
        isSendingComment,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

const requestClapFinished = (state, post, data) => {
    const isClapping = false;

    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            data.post_id,
            (selected_post) =>
                updateObject(selected_post, {
                    node: {
                        ...post
                    }
                }),
            'uuid'
        )
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: updateNestedItemArray(
                        state.user_data.data.user.posts.edges,
                        data.post_id,
                        (selected_post) =>
                            updateObject(selected_post, {
                                node: {
                                    ...post
                                }
                            }),
                        'uuid'
                    )
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isClapping,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

const requestViewPageFinished = (state, post, post_id) => {
    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            post_id,
            (selected_post) =>
                updateObject(selected_post, {
                    node: {
                        ...post
                    }
                }),
            'uuid'
        )
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: updateNestedItemArray(
                        state.user_data.data.user.posts.edges,
                        post_id,
                        (selected_post) =>
                            updateObject(selected_post, {
                                node: {
                                    ...post
                                }
                            }),
                        'uuid'
                    )
                })
            })
        })
    });

    const new_state = updateObject(state, {
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

// fetch requests
const recieveArticles = (state, articles, cursor, hasNextPage) => {
    const isFetching = false;
    const lastFetch = Date.now();

    const store = updateObject(state, {
        isFetching,
        lastFetch,
        cursor,
        hasNextPage,
        post_data: updateObject(state.post_data, {
            posts: articles
        })
    });

    return store;
};

const recieveMoreArticles = (state, articles, cursor, hasNextPage) => {
    const isFetching = false;
    const lastFetch = Date.now();

    const store = updateObject(state, {
        isFetching,
        lastFetch,
        cursor,
        hasNextPage,
        post_data: updateObject(state.post_data, {
            posts: state.post_data.posts.concat(articles)
        })
    });

    return store;
};

const recieveUserProfileData = (state, profile_data) => {
    if(profile_data == null){
        return state;
    }
    const isFetching = false;
    const lastFetch = Date.now();

    removeDuplicateInArray('id', state.public_users.users, profile_data.id);

    const store = updateObject(state, {
        isFetching,
        lastFetch,
        public_users: updateObject(state.public_users, {
            users: state.public_users.users.concat(profile_data)
        })
    });

    return store;
};

// auth requests
const loginUser = (state, res) => {
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

const logoutUser = (state, logout) => {
    if (logout == true) {
        saveToStore(false, 'med-blog-logged-in');
        removeFromStore('med-blog-ref');
    }

    return updateObject(state, {
        user_data: {}
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

// Reducer
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case constants.SEND_REQUEST:
        return sendRequest(state);

    case constants.SEND_LOGIN_REQUEST:
        return sendloginRequest(state);

    case constants.SEND_COMMENT:
        return sendCommentRequest(state);

    case constants.SEND_CLAP:
        return sendClapRequest(state);

    case constants.RECIEVE_ARTICLES:
        return recieveArticles(
            state,
            action.payload,
            action.cursor,
            action.hasNextPage
        );

    case constants.RECIEVE_MORE_ARTICLES:
        return recieveMoreArticles(
            state,
            action.payload,
            action.cursor,
            action.hasNextPage
        );

    case constants.LOGIN_USER:
        return loginUser(state, action.payload);

    case constants.LOGOUT_USER:
        return logoutUser(state, action.logout);

    case constants.RECIEVE_USER_DATA:
        return recieveUserData(state, action.payload);

    case constants.REQUEST_TAG_FINISHED:
        return requestTagsFinished(
            state,
            action.tag.data.createTag.post,
            action.post_id
        );

    case constants.REQUEST_POST_FINISHED:
        return requestPostsFinished(
            state,
            action.post.data.createPost.post
        );

    case constants.REQUEST_EDIT_POST_FINISHED:
        return requestEditPostFinished(
            state,
            action.post.data.updatePost.post,
            action.post_id
        );

    case constants.REQUEST_DELETE_POST_FINISHED:
        return requestDeletePostFinished(state, action.post_id);

    case constants.REQUEST_USER_EDIT_FINISHED:
        return requestUserEditFinished(state, action);

    case constants.REQUEST_COMMENT_FINISHED:
        return requestCommentFinished(
            state,
            action.post.data.createComment.post,
            action.comment,
            action.data
        );

    case constants.REQUEST_COMMENT_REPLY_FINISHED:
        return requestCommentReplyFinished(
            state,
            action.post.data.createCommentReply.post,
            action.commentReply,
            action.data
        );

    case constants.REQUEST_CLAP_FINISHED:
        return requestClapFinished(
            state,
            action.post.data.createClap.post,
            action.data
        );

    case constants.VIEW_PAGE:
        return requestViewPageFinished(
            state,
            action.post.data.viewPost.post,
            action.pageId
        );

    case constants.RECIEVE_USER_PROFILE:
        return recieveUserProfileData(
            state,
            action.payload
        );

    default:
        return state;
    }
};

export default rootReducer;
