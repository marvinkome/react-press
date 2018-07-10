import React from 'react';

import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

import withApolloClient from '../components/hoc/withApollo';
// import Error from '../components/error';

import { isLoggedIn } from '../lib/helpers';
// import { getCookie, removeCookie, getFromStore } from '../lib/storage';
// import { tokenKey, loggedInKey } from '../keys/storage';

// import { Provider } from 'react-redux';
// // import createStore from '../store';
// // import withRedux from 'next-redux-wrapper';
// import { setupNotification } from '../store/actions-creators';
// import { fetch_all_data, fetch_user_data } from '../store/actions';

import 'materialize-css/dist/css/materialize.min.css';
import '../style/index.less';
if (typeof window !== 'undefined') {
    require('materialize-css/dist/js/materialize.js');
}

class InitApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        const loggedIn = isLoggedIn(ctx.req);

        pageProps = {
            ...pageProps,
            loggedIn
        };

        return {
            pageProps
        };
    }

    render() {
        const { Component, pageProps, apolloClient } = this.props;
        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} error={pageProps.error} />
                </ApolloProvider>
            </Container>
        );
    }
}

export default withApolloClient(InitApp);
