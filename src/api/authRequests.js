import fetch from 'isomorphic-fetch';
import { url } from '../keys/api';

export default (data) => {
    const makeRequest = async (data, type) => {
        const headers = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await (await fetch(`${url}/${type}`, headers)).json();
    };

    return {
        login: makeRequest(data, 'login'),
        register: makeRequest(data, 'register')
    };
};
