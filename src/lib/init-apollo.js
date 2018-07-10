// This file is gotten from nextJs example
// https://github.com/zeit/next.js/blob/canary/examples/with-apollo/lib/init-apollo.js
// all comments are in the remote file

import { ApolloClient } from 'apollo-boost';
import { HttpLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { url as uri } from '../keys/api';

let apolloClient = null;

if (!process.browser) {
    global.fetch = fetch;
}

function create(initialState) {
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser,
        link: new HttpLink({
            uri: uri + '/graphql'
        }),
        cache: new InMemoryCache().restore(initialState || {})
    });
}

export default function initApollo(initialState) {
    if (!process.browser) {
        return create(initialState);
    }

    if (!apolloClient) {
        apolloClient = create(initialState);
    }

    return apolloClient;
}
