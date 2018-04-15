/**
 * ./src/js/redux/actions.js
 */

import * as constants from './constants';

export const sendRequest = () => ({
    type: constants.SEND_REQUEST
});

export const recieveArticles = article => ({
    type: constants.RECIEVE_ARTICLES,
    payload: article
});

export const fetch_all_data = () => {
    return dispatch => {
        dispatch(sendRequest());

        const query = `
            {
                posts{
                    uuid
                    title
                    body
                    timestamp
                    author{
                        fullName
                        description
                    }
                }
            }
        `;

        const headers = {
            method: 'POST',
            body: JSON.stringify({ query }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch('http://127.0.0.1:5000/graphql', headers)
            .then(resp => resp.json())
            .then(res => dispatch(recieveArticles(res)));
    };
};
