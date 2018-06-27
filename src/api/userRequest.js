import fetch from 'isomorphic-fetch';
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

export default async (query, r_token) => {
    const headers = ({ access_token }) => ({
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    });

    try {
        const accessToken = await (await getAccessToken(r_token)).json();
        const data = await (await fetch(`${url}/graphql`, headers(accessToken))).json();

        return data;
    } catch (e) {
        process.env.NODE_ENV !== 'production' ? console.error(e) : ''; // eslint-disable-line
        return e;
    }
};
