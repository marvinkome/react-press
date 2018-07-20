import fetch from 'isomorphic-fetch';
import { url } from '../keys';
import { logout } from './helpers';

export const customFetch = (uri, options) => {
    const { getToken } = options;
    const token = getToken();

    delete options.getToken;

    // check if there's a token and it's not empty i.e user is loggedIn
    if (token) {
        // refresh and get an access token
        const address = url + '/refresh';
        const promise = fetch(address, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            if (res.ok) {
                return res.json().then((token_json) => token_json.access_token);
            } else {
                // something went wrong, logout the user
                // i.e delete the cookie
                logout();
            }
        });

        // use the access token to make the request and return a new promise
        return promise.then((a_token) => {
            options.headers.authorization = `Bearer ${a_token}`;
            return fetch(uri, options);
        });
    } else {
        // no token, logged out. This will cause a server error if
        // we continue with the token in the header
        // so we remove the auth header and return the promise
        options.headers.authorization = null;
        return fetch(uri, options);
    }
};
