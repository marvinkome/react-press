/**
 * ./src/js/redux/actions.js
 */

import * as constants from './constants';
import * as query from './queries';
import * as mutations from './mutations';

/**
 * Redux sync actions for reducers
 */

export const sendRequest = () => ({
    type: constants.SEND_REQUEST
});

export const sendComment = () => ({
    type: constants.SEND_COMMENT
});

export const sendClap = () => ({
    type: constants.SEND_CLAP
});

export const requestFinished = () => ({
    type: constants.REQUEST_FINISHED
});

export const requestCommentFinished = () => ({
    type: constants.REQUEST_COMMENT_FINISHED
});

export const requestClapFinished = (clap, data) => ({
    type: constants.REQUEST_CLAP_FINISHED,
    clap: clap.data.createClap.clap,
    data
});

export const recieveArticles = article => ({
    type: constants.RECIEVE_ARTICLES,
    payload: article
});

export const recieveArticle = article => ({
    type: constants.RECIEVE_ARTICLE,
    payload: article
});

export const recieveUserData = payload => ({
    type: constants.RECIEVE_USER_DATA,
    payload
});

export const loginUser = payload => ({
    type: constants.LOGIN_USER,
    payload
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

export const fetch_post = id => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: query.fetch_post_query(id) }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(resp => resp.json())
            .then(res => dispatch(recieveArticle(res)));
    };
};

export const fetch_user_data = () => {
    const key = JSON.parse(localStorage.getItem('med-blog-access-token'));

    return dispatch => {
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: query.fetch_user_data_query }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: key
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(res => res.json())
            .then(res => dispatch(recieveUserData(res)));
    };
};

// Auth Actions
export const login_user = data => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
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
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/register', headers)
            .then(res => res.json())
            .then(res => dispatch(loginUser(res)));
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

        return fetch('http://192.168.43.200:5000/graphql', headers).then(
            res => {
                dispatch(requestFinished());
                return res.json();
            }
        );
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

        return fetch('http://192.168.43.200:5000/graphql', headers).then(
            res => {
                dispatch(requestFinished());
                return res.json();
            }
        );
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

        return fetch('http://192.168.43.200:5000/graphql', headers).then(
            res => {
                dispatch(requestFinished());
                return res.json();
            }
        );
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

        return fetch('http://192.168.43.200:5000/graphql', headers).then(
            res => {
                dispatch(requestFinished());
                return res.json();
            }
        );
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

        return fetch('http://192.168.43.200:5000/graphql', headers).then(
            res => {
                dispatch(requestFinished());
                return res.json();
            }
        );
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

        return fetch('http://192.168.43.200:5000/graphql', headers).then(
            res => {
                dispatch(requestFinished());
                return res.json();
            }
        );
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

        return fetch('http://192.168.43.200:5000/graphql', headers).then(
            res => {
                dispatch(requestCommentFinished());
                return res.json();
            }
        );
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

        return fetch('http://192.168.43.200:5000/graphql', headers).then(
            res => {
                dispatch(requestCommentFinished());
                return res.json();
            }
        );
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
