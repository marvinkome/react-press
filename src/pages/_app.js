import React from 'react';

import App, { Container } from 'next/app';
import Error from '../components/error';

import { isLoggedIn, createToast } from '../lib/helpers';
import { getCookie, removeCookie, getFromStore } from '../lib/storage';
import { tokenKey, loggedInKey } from '../keys/storage';

import { Provider } from 'react-redux';
import createStore from '../store';
import withRedux from 'next-redux-wrapper';
import { setupNotification } from '../store/actions-creators';
import { fetch_all_data, fetch_user_data } from '../store/actions';

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

        const server = ctx.isServer;
        const loggedIn = isLoggedIn(ctx.req);

        pageProps = {
            ...pageProps,
            loggedIn
        };

        // is server?
        if (server === true) {
            // since initial rendering only occurs in the server side
            // user data should be fetched only in the server side

            if (loggedIn) {
                // fetch user data if user is loggedIn
                const token = getCookie(ctx.req, tokenKey);

                const res = await ctx.store.dispatch(fetch_user_data(token));

                // check for fetch error
                if (res && res.payload) {
                    if (res.payload.name === 'FetchError') {
                        pageProps = {
                            ...pageProps,
                            loggedIn: false,
                            error: true
                        };
                    }
                }

                // check for token error
                if (res && res.payload) {
                    if (res.payload.msg === 'Not enough segments') {
                        createToast('Session expired please login');
                        removeCookie(tokenKey);
                        removeCookie(loggedInKey);
                    }
                }
            }

            // fetch post data
            try {
                await ctx.store.dispatch(fetch_all_data());
            } catch (e) {
                pageProps = {
                    ...pageProps,
                    error: true
                };
            }
        }

        return {
            pageProps
        };
    }

    componentDidMount() {
        if (this.props.pageProps.error !== true && isLoggedIn()) {
            const token = getFromStore(tokenKey);
            this.props.store.dispatch(setupNotification(token));
        }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    {pageProps.error ? (
                        <Error
                            render={
                                <div className="valign-wrapper center">
                                    <h5>
                                        It{'\''}s not you it{'\''}s us. Please reload this page.
                                        <br />
                                        If it persists try again later. We{'\''}re really sorry.
                                    </h5>
                                </div>
                            }
                            fullScreen
                        />
                    ) : (
                        <Component {...pageProps} error={pageProps.error} />
                    )}
                </Provider>
            </Container>
        );
    }
}

export default withRedux(createStore)(InitApp);
