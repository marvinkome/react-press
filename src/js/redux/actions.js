/**
 * ./src/js/redux/actions.js
 */

import * as constants from './constants';

export const requestArticle = () => ({
    type: constants.REQUEST_ARTICLE
});

export const recieveArticle = article => ({
    type: constants.RECIEVE_ARTICLE,
    payload: article
});

export const fetch_data = () => {
    return dispatch => {
        dispatch(requestArticle());

        return fetch('http://127.0.0.1:5000/graphl')
            .then(resp => resp.json())
            .then(res => dispatch(recieveArticle(res)));
    };
};
