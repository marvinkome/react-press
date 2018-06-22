import fetch from 'isomorphic-fetch';
import { url } from '../keys/api';

export default async (data) => {
    const headers = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return await ( await fetch(`${url}/login`, headers) ).json();
};
