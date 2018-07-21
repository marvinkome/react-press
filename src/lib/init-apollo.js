// This file is gotten from nextJs example
// https://github.com/zeit/next.js/blob/canary/examples/with-apollo-auth/lib/init-apollo.js
// all comments are in the remote file

import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';
import { url } from '../keys';
import { customFetch } from './fetch';

let apolloClient = null;

if (!process.browser) {
    global.fetch = fetch;
}

function create(initialState, { getToken }) {
    const httpLink = createHttpLink({
        uri: url + '/graphql',
        fetch: customFetch,
        fetchOptions: {
            getToken
        }
    });

    const authLink = setContext((_, { headers }) => {
        const token = getToken();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        };
    });

    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser,
        link: authLink.concat(httpLink),
        cache: new InMemoryCache().restore(initialState || {})
    });
}

export default function initApollo(initialState, options) {
    if (!process.browser) {
        return create(initialState, options);
    }

    if (!apolloClient) {
        apolloClient = create(initialState, options);
    }

    return apolloClient;
}
