import React from 'react';

import App, {Container} from 'next/app';

import { Provider } from 'react-redux';
import createStore from '../store';
import withRedux from 'next-redux-wrapper';
import { fetch_all_data } from '../store/actions';



class InitApp extends App {
    static async getInitialProps ({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        try {
            await ctx.store.dispatch(fetch_all_data());
        } catch (e) {
            console.error(e); // eslint-disable-line
        }

        return {
            pageProps
        };
    }

    render () {
        const {Component, pageProps, store} = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withRedux(createStore)(InitApp);
