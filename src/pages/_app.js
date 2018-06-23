import React from 'react';

import App, { Container } from 'next/app';
import Error from '../components/error';

import { Provider } from 'react-redux';
import createStore from '../store';
import withRedux from 'next-redux-wrapper';
import { fetch_all_data } from '../store/actions';

class InitApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        try {
            await ctx.store.dispatch(fetch_all_data());
        } catch (e) {
            console.error(e); // eslint-disable-line
            return {
                ...pageProps,
                error: true
            };
        }

        return {
            pageProps
        };
    }

    render() {
        const { Component, pageProps, store, error } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    {error ? (
                        <Error
                            render={
                                <div className="valign-wrapper center">
                                    <h5>
                                        It{'\''}s not you it{'\''}s us. 
                                        Please reload this page. 
                                        If it persists try again later. We{'\''}re really sorry.
                                    </h5>
                                </div>
                            }
                            fullScreen
                        />
                    ) : (
                        <Component {...pageProps} error={error} />
                    )}
                </Provider>
            </Container>
        );
    }
}

export default withRedux(createStore)(InitApp);
