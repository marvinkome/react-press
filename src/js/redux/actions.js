/**
 * ./src/js/redux/actions.js
 */

import * as constants from './constants';
import * as query from './queries';
import * as mutations from './mutations';
import { getCookie } from '../helpers';

/**
 * Redux sync actions for reducers
 */

// Request sync actions
export const sendRequest = () => ({
    type: constants.SEND_REQUEST
});

export const sendLoginRequest = () => ({
    type: constants.SEND_LOGIN_REQUEST
});

export const sendComment = () => ({
    type: constants.SEND_COMMENT
});

export const sendClap = () => ({
    type: constants.SEND_CLAP
});

// After request sync actions for admin
export const requestCreateTagsFinished = (tag, data) => ({
    type: constants.REQUEST_TAG_FINISHED,
    post_id: data.post_id,
    tag: tag.data.createTag.post
});

export const requestCreatePostsFinished = post => ({
    type: constants.REQUEST_POST_FINISHED,
    post: post.data.createPost.post
});

export const requestEditPostFinished = (post, data) => ({
    type: constants.REQUEST_EDIT_POST_FINISHED,
    post: post.data.updatePost.post,
    post_id: data.postId
});

export const requestDeletePostFinished = data => ({
    type: constants.REQUEST_DELETE_POST_FINISHED,
    post_id: data
});

export const requestUpdateUserFinished = () => ({
    type: constants.REQUEST_USER_EDIT_FINISHED
});

// After request sync actions for post
export const requestCommentFinished = (res, data) => ({
    type: constants.REQUEST_COMMENT_FINISHED,
    post: res.data.createComment.post,
    comment: res.data.createComment.comment,
    data
});

export const requestCommentReplyFinished = (res, data) => ({
    type: constants.REQUEST_COMMENT_REPLY_FINISHED,
    post: res.data.createCommentReply.post,
    commentReply: res.data.createCommentReply.commentReply,
    data
});

export const requestClapFinished = (res, data) => ({
    type: constants.REQUEST_CLAP_FINISHED,
    post: res.data.createClap.post,
    data
});

// After request sync actions - general
export const recieveArticles = res => ({
    type: constants.RECIEVE_ARTICLES,
    payload: res.data.allPost.edges,
    cursor: res.data.allPost.pageInfo.endCursor,
    hasNextPage: res.data.allPost.pageInfo.hasNextPage
});

export const recieveMoreArticles = res => ({
    type: constants.RECIEVE_MORE_ARTICLES,
    payload: res.data.allPost.edges,
    cursor: res.data.allPost.pageInfo.endCursor,
    hasNextPage: res.data.allPost.pageInfo.hasNextPage
});

// After auth request
export const recieveUserData = payload => ({
    type: constants.RECIEVE_USER_DATA,
    payload
});

export const loginUser = payload => ({
    type: constants.LOGIN_USER,
    payload
});

export const logoutUser = res => ({
    type: constants.LOGOUT_USER,
    res
});

/**
 * Redux async Thunks
 */

// Query Actions
export const fetch_all_data = () => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: query.fetch_query }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(resp => resp.json())
            .then(res => dispatch(recieveArticles(res)));
    };
};

export const fetch_more_data = cursor => {
    return dispatch => {
        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: query.fetch_more(cursor) }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(resp => resp.json())
            .then(res => dispatch(recieveMoreArticles(res)));
    };
};

const refresh_token = cookie => {
    return fetch('http://192.168.43.200:5000/refresh', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': cookie
        }
    });
};

export const fetch_user_data = () => {
    const key = JSON.parse(localStorage.getItem('med-blog-ref'));

    return dispatch => {
        dispatch(sendRequest());

        const headers = arg_key => ({
            method: 'POST',
            body: JSON.stringify({ query: query.fetch_user_data_query }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': arg_key
            }
        });

        return refresh_token(key)
            .then(res => res.json())
            .then(() => {
                const access_token = getCookie('csrf_access_token');
                return fetch(
                    'http://192.168.43.200:5000/graphql',
                    headers(access_token)
                ).then(res => res.json());
            })
            .then(res => dispatch(recieveUserData(res)));
    };
};

// Auth Actions
export const login_user = data => {
    return dispatch => {
        dispatch(sendLoginRequest());

        const headers = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/login', headers)
            .then(res => res.json())
            .then(res => dispatch(loginUser(res)));
    };
};

export const register_user = data => {
    return dispatch => {
        dispatch(sendLoginRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/register', headers)
            .then(res => res.json())
            .then(res => dispatch(loginUser(res)));
    };
};

export const logout_user = () => {
    return dispatch => {
        const headers = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/logout', headers)
            .then(res => res.json())
            .then(res => dispatch(logoutUser(res)));
    };
};

// Mutatons Actions
export const create_tags = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify({
                query: mutations.create_tag(data.tag_name, data.post_id)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(res => res.json())
            .then(res => dispatch(requestCreateTagsFinished(res, data)));
    };
};

export const create_posts = data => {
    return dispatch => {
        dispatch(sendRequest());

        const new_data = {
            ...data,
            userId: 1
        };

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: mutations.create_post(new_data) }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(res => res.json())
            .then(res => dispatch(requestCreatePostsFinished(res)));
    };
};

export const edit_post = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: mutations.edit_post(data) }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(res => res.json())
            .then(res => dispatch(requestEditPostFinished(res, data)));
    };
};

export const delete_post = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: mutations.delete_post(data) }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(res => res.json())
            .then(() => dispatch(requestDeletePostFinished(data)));
    };
};

export const update_profile_pic = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify({
                query: mutations.update_profile_picture(
                    data.pic_url,
                    data.user_id
                )
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(res => res.json())
            .then(() => dispatch(requestUpdateUserFinished()));
    };
};

export const update_user_info = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: mutations.update_info(data) }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(res => res.json())
            .then(() => dispatch(requestUpdateUserFinished()));
    };
};

export const add_comment = data => {
    return dispatch => {
        dispatch(sendComment());

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: mutations.create_comment(data) }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(res => res.json())
            .then(res => dispatch(requestCommentFinished(res, data)));
    };
};

export const reply_comment = data => {
    return dispatch => {
        dispatch(sendComment());

        const headers = {
            method: 'POST',
            body: JSON.stringify({
                query: mutations.create_comment_reply(data)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(res => res.json())
            .then(res => dispatch(requestCommentReplyFinished(res, data)));
    };
};

export const clap = data => {
    return dispatch => {
        dispatch(sendClap());

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: mutations.clap(data) }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(res => res.json())
            .then(res => dispatch(requestClapFinished(res, data)));
    };
};
