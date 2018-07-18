import React from 'react';

import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

import withApolloClient from '../components/hoc/withApollo';

import { checkLoggedIn } from '../lib/helpers';

import 'materialize-css/dist/css/materialize.min.css';
import '../style/index.less';
if (typeof window !== 'undefined') {
    require('materialize-css/dist/js/materialize.min.js');
}

class InitApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        // const loggedIn = false;
        const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

        pageProps = {
            ...pageProps,
            loggedIn: loggedInUser.user ? true : false
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
