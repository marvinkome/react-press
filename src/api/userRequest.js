import fetch from 'isomorphic-fetch';
import { getFromStore } from '../lib/storage';
import { tokenKey } from '../keys/storage';
import { url } from '../keys/api';

const getAccessToken = (token) => {
    return fetch(`${url}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    });
};

export default async (query) => {

    const headers = (token) => ({
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    });

    try {
        const refreshToken = getFromStore(tokenKey);
        const accessToken = await ( await getAccessToken(refreshToken) ).json();
        const data = await ( await fetch(`${url}/graphql`, headers(accessToken) ) ).json();

        return data;
    } catch (e) {
        process.env.NODE_ENV !== 'production' ? console.error(e) : ''; // eslint-disable-line
        return e;
    }
};