/**
 * ./src/js/redux/actions.js
 */

import * as constants from './constants';
import * as query from './queries';
import * as mutations from './mutations';

const url =
    process.env.NODE_ENV == 'production'
        ? 'https://reactpress-api.herokuapp.com'
        : 'http://127.0.0.1:5000';

// Refresh token for protected query and mutations
const refresh_token = token => {
    return fetch(url + '/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    });
};
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
    tag: tag
});

export const requestCreatePostsFinished = post => ({
    type: constants.REQUEST_POST_FINISHED,
    post: post
});

export const requestEditPostFinished = (post, data) => ({
    type: constants.REQUEST_EDIT_POST_FINISHED,
    post: post,
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
    post: res,
    comment: res.data.createComment.comment,
    data
});

export const requestCommentReplyFinished = (res, data) => ({
    type: constants.REQUEST_COMMENT_REPLY_FINISHED,
    post: res,
    commentReply: res.data.createCommentReply.commentReply,
    data
});

export const requestClapFinished = (res, data) => ({
    type: constants.REQUEST_CLAP_FINISHED,
    post: res,
    data
});

export const requestViewPageFinished = (res, pageId) => ({
    type: constants.VIEW_PAGE,
    post: res,
    pageId
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

export const logoutUser = () => ({
    type: constants.LOGOUT_USER,
    logout: true
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

        return fetch(url + '/graphql', headers)
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

        return fetch(url + '/graphql', headers)
            .then(resp => resp.json())
            .then(res => dispatch(recieveMoreArticles(res)));
    };
};

export const fetch_user_data = () => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = token => ({
            method: 'POST',
            body: JSON.stringify({ query: query.fetch_user_data_query }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then(res => res.json())
            .then(res => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then(
                    res => res.json()
                );
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
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(url + '/login', headers)
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
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(url + '/register', headers)
            .then(res => res.json())
            .then(res => dispatch(loginUser(res)));
    };
};

// Mutatons Actions
export const create_tags = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = token => ({
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
            .then(res => res.json())
            .then(res => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then(
                    res => res.json()
                );
            })
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

        const headers = token => ({
            method: 'POST',
            body: JSON.stringify({ query: mutations.create_post(new_data) }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then(res => res.json())
            .then(res => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then(
                    res => res.json()
                );
            })
            .then(res => dispatch(requestCreatePostsFinished(res)));
    };
};

export const edit_post = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = token => ({
            method: 'POST',
            body: JSON.stringify({ query: mutations.edit_post(data) }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then(res => res.json())
            .then(res => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then(
                    res => res.json()
                );
            })
            .then(res => dispatch(requestEditPostFinished(res, data)));
    };
};

export const delete_post = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = token => ({
            method: 'POST',
            body: JSON.stringify({ query: mutations.delete_post(data) }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then(res => res.json())
            .then(res => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then(
                    res => res.json()
                );
            })
            .then(() => dispatch(requestDeletePostFinished(data)));
    };
};

export const update_profile_pic = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = token => ({
            method: 'POST',
            body: JSON.stringify({
                query: mutations.update_profile_picture(
                    data.pic_url,
                    data.user_id
                )
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then(res => res.json())
            .then(res => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then(
                    res => res.json()
                );
            })
            .then(() => dispatch(requestUpdateUserFinished()));
    };
};

export const update_user_info = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = token => ({
            method: 'POST',
            body: JSON.stringify({ query: mutations.update_info(data) }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then(res => res.json())
            .then(res => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then(
                    res => res.json()
                );
            })
            .then(() => dispatch(requestUpdateUserFinished()));
    };
};

export const add_comment = data => {
    return dispatch => {
        dispatch(sendComment());

        const headers = token => ({
            method: 'POST',
            body: JSON.stringify({ query: mutations.create_comment(data) }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then(res => res.json())
            .then(res => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then(
                    res => res.json()
                );
            })
            .then(res => dispatch(requestCommentFinished(res, data)));
    };
};

export const reply_comment = data => {
    return dispatch => {
        dispatch(sendComment());

        const headers = token => ({
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
            .then(res => res.json())
            .then(res => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then(
                    res => res.json()
                );
            })
            .then(res => dispatch(requestCommentReplyFinished(res, data)));
    };
};

export const clap = data => {
    return dispatch => {
        dispatch(sendClap());

        const headers = token => ({
            method: 'POST',
            body: JSON.stringify({ query: mutations.clap(data) }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        });

        return refresh_token(JSON.parse(localStorage.getItem('med-blog-ref')))
            .then(res => res.json())
            .then(res => {
                const access_token = res.access_token;
                return fetch(url + '/graphql', headers(access_token)).then(
                    res => res.json()
                );
            })
            .then(res => dispatch(requestClapFinished(res, data)));
    };
};

export const view_page = pageId => {
    return dispatch => {
        const headers = {
            method: 'POST',
            body: JSON.stringify({query: mutations.viewPage(pageId)}),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(url + '/graphql', headers)
            .then(res => res.json())
            .then(res => dispatch(requestViewPageFinished(res, pageId)));
    };
};
