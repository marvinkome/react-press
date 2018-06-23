import fetch from 'isomorphic-fetch';
import { url } from '../keys/api';

export default async (query) => {
    const headers = {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const json = await (await fetch(`${url}/graphql`, headers)).json();
        return json;
    } catch (e) {
        return e;
    }
};
