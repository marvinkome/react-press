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

    return await ( await fetch(`${url}/graphql`, headers) ).json();
};
