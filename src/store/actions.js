/**
 * ./src/js/redux/actions.js
 */

import fetch from 'isomorphic-fetch';
import queryRequest from '../api/queryRequest';
import * as creators from './actions-creators';
import * as types from './actionTypes';
import * as query from './graphql/queries';
import * as mutations from './graphql/mutations';

const url =
    process.env.NODE_ENV == 'production'
        ? 'https://reactpress-api.herokuapp.com'
        : 'http://127.0.0.1:5000';

// Refresh token for protected query and mutations
const refresh_token = (token) => {
    return fetch(url + '/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    });
};

// After request sync actions - admin
export const requestCreateTagsFinished = (tag, data) => ({
    type: types.REQUEST_TAG_FINISHED,
    post_id: data.post_id,
    tag: tag
});

export const requestCreatePostsFinished = (post) => ({
    type: types.REQUEST_POST_FINISHED,
    post: post
});

export const requestEditPostFinished = (post, data) => ({
    type: types.REQUEST_EDIT_POST_FINISHED,
    post: post,
    post_id: data.postId
});

export const requestDeletePostFinished = (data) => ({
    type: types.REQUEST_DELETE_POST_FINISHED,
    post_id: data
});

export const requestUpdateUserFinished = () => ({
    type: types.REQUEST_USER_EDIT_FINISHED
});

// After request sync actions - post
export const requestCommentFinished = (res, data) => ({
    type: types.REQUEST_COMMENT_FINISHED,
    post: res,
    comment: res.data.createComment.comment,
    data
});

export const requestCommentReplyFinished = (res, data) => ({
    type: types.REQUEST_COMMENT_REPLY_FINISHED,
    post: res,
    commentReply: res.data.createCommentReply.commentReply,
    data
});

export const requestClapFinished = (res, data) => ({
    type: types.REQUEST_CLAP_FINISHED,
    post: res,
    data
});

export const requestViewPageFinished = (res, pageId) => ({
    type: types.VIEW_PAGE,
    post: res,
    pageId
});

// After request sync actions - general
export const recieveArticles = (res) => ({
    type: types.RECIEVE_ARTICLES,
    payload: res.data.allPost.edges,
    cursor: res.data.allPost.pageInfo.endCursor,
    hasNextPage: res.data.allPost.pageInfo.hasNextPage
});

export const recieveMoreArticles = (res) => ({
    type: types.RECIEVE_MORE_ARTICLES,
    payload: res.data.allPost.edges,
    cursor: res.data.allPost.pageInfo.endCursor,
    hasNextPage: res.data.allPost.pageInfo.hasNextPage
});

export const recieveUserProfile = (res) => ({
    type: types.RECIEVE_USER_PROFILE,
    payload: res.data.publicUser
});

// After auth request
export const recieveUserData = (payload) => ({
    type: types.RECIEVE_USER_DATA,
    payload
});

export const loginUser = (payload) => ({
    type: types.LOGIN_USER,
    payload
});

export const logoutUser = () => ({
    type: types.LOGOUT_USER,
    logout: true
});

// Socket action
export const onNotification = (message) => ({
    type: types.ON_NOTIFICATION,
    message
});

export const readAllNotifications = () => ({
    type: types.READ_ALL_NOTIFICATIONS
});

/**
 * Redux async Thunks
 */

// Query Actions
export const fetch_all_data = () => {
    return (dispatch) => {
        dispatch(creators.sendRequest());

        return queryRequest(query.fetch_query)
            .then(res => dispatch(recieveArticles(res)));
    };
};

export const fetch_more_data = (cursor) => {
    return (dispatch) => {
        return queryRequest(query.fetch_more(cursor))
            .then(res => dispatch(recieveMoreArticles(res)));
    };
};

export const fetch_user_data = () => {
    return (dispatch) => {
        dispatch(creators.sendRequest());

        const headers = (token) => ({
            method: 'POST',
            body: JSON.stringify({
                query: query.fetch_user_data_query
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then((res) => res.json())
            .then((res) => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then((res) => res.json());
            })
            .then((res) => dispatch(recieveUserData(res)));
    };
};

export const fetch_profile_data = (username) => {
    return (dispatch) => {
        dispatch(creators.sendRequest());
        
        return queryRequest(query.fetch_profile_query(username))
            .then(res => dispatch(recieveUserProfile(res)));
    };
};

// Auth Actions
export const login_user = (data) => {
    return (dispatch) => {
        dispatch(creators.sendLoginRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(url + '/login', headers)
            .then((res) => res.json())
            .then((res) => dispatch(loginUser(res)));
    };
};

export const register_user = (data) => {
    return (dispatch) => {
        dispatch(creators.sendLoginRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(url + '/register', headers)
            .then((res) => res.json())
            .then((res) => dispatch(loginUser(res)));
    };
};

// Mutatons Actions
export const create_tags = (data) => {
    return (dispatch) => {
        dispatch(creators.sendRequest());

        const headers = (token) => ({
            method: 'POST',
            body: JSON.stringify({
                query: mutations.create_tag(data.tag_name, data.post_id)
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then((res) => res.json())
            .then((res) => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then((res) => res.json());
            })
            .then((res) => dispatch(requestCreateTagsFinished(res, data)));
    };
};

export const create_posts = (data) => {
    return (dispatch) => {
        dispatch(creators.sendRequest());

        const new_data = {
            ...data,
            userId: 1
        };

        const headers = (token) => ({
            method: 'POST',
            body: JSON.stringify({
                query: mutations.create_post(new_data)
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then((res) => res.json())
            .then((res) => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then((res) => res.json());
            })
            .then((res) => dispatch(requestCreatePostsFinished(res)));
    };
};

export const edit_post = (data) => {
    return (dispatch) => {
        dispatch(creators.sendRequest());

        const headers = (token) => ({
            method: 'POST',
            body: JSON.stringify({
                query: mutations.edit_post(data)
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then((res) => res.json())
            .then((res) => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then((res) => res.json());
            })
            .then((res) => dispatch(requestEditPostFinished(res, data)));
    };
};

export const delete_post = (data) => {
    return (dispatch) => {
        dispatch(creators.sendRequest());

        const headers = (token) => ({
            method: 'POST',
            body: JSON.stringify({
                query: mutations.delete_post(data)
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then((res) => res.json())
            .then((res) => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then((res) => res.json());
            })
            .then(() => dispatch(requestDeletePostFinished(data)));
    };
};

export const update_profile_pic = (data) => {
    return (dispatch) => {
        dispatch(creators.sendRequest());

        const headers = (token) => ({
            method: 'POST',
            body: JSON.stringify({
                query: mutations.update_profile_picture(data.pic_url, data.user_id)
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then((res) => res.json())
            .then((res) => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then((res) => res.json());
            })
            .then(() => dispatch(requestUpdateUserFinished()));
    };
};

export const update_user_info = (data) => {
    return (dispatch) => {
        dispatch(creators.sendRequest());

        const headers = (token) => ({
            method: 'POST',
            body: JSON.stringify({
                query: mutations.update_info(data)
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then((res) => res.json())
            .then((res) => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then((res) => res.json());
            })
            .then(() => dispatch(requestUpdateUserFinished()));
    };
};

export const add_comment = (data) => {
    return (dispatch) => {
        dispatch(creators.sendComment());

        const headers = (token) => ({
            method: 'POST',
            body: JSON.stringify({
                query: mutations.create_comment(data)
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then((res) => res.json())
            .then((res) => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then((res) => res.json());
            })
            .then((res) => dispatch(requestCommentFinished(res, data)));
    };
};

export const reply_comment = (data) => {
    return (dispatch) => {
        dispatch(creators.sendComment());

        const headers = (token) => ({
            method: 'POST',
            body: JSON.stringify({
                query: mutations.create_comment_reply(data)
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then((res) => res.json())
            .then((res) => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then((res) => res.json());
            })
            .then((res) => dispatch(requestCommentReplyFinished(res, data)));
    };
};

export const clap = (data) => {
    return (dispatch) => {
        dispatch(creators.sendClap());

        const headers = (token) => ({
            method: 'POST',
            body: JSON.stringify({ query: mutations.clap(data) }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then((res) => res.json())
            .then((res) => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then((res) => res.json());
            })
            .then((res) => dispatch(requestClapFinished(res, data)));
    };
};

export const view_page = (pageId) => {
    return (dispatch) => {
        const headers = {
            method: 'POST',
            body: JSON.stringify({
                query: mutations.viewPage(pageId)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(url + '/graphql', headers)
            .then((res) => res.json())
            .then((res) => dispatch(requestViewPageFinished(res, pageId)));
    };
};
