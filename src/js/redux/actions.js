/**
 * ./src/js/redux/actions.js
 */

import * as constants from './constants';
import * as query from './queries';
import * as mutations from './mutations';

export const sendRequest = () => ({
    type: constants.SEND_REQUEST
});

export const requestFinished = () => ({
    type: constants.REQUEST_FINISHED
});

export const recieveArticles = article => ({
    type: constants.RECIEVE_ARTICLES,
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

export const fetch_all_data = () => {
    return dispatch => {
        dispatch(sendRequest());

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query: query.fetch_alls_query }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://192.168.43.200:5000/graphql', headers)
            .then(resp => resp.json())
            .then(res => dispatch(recieveArticles(res)));
    };
};

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
