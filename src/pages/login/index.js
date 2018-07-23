import React from 'react';
import Head from 'next/head';
import View from './view';
import redirect from '../../lib/redirect';
import { checkLoggedIn } from '../../lib/helpers';
import './style.less';

export class Login extends React.Component {
    static async getInitialProps(ctx) {
        const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

        if (loggedInUser.user) {
            redirect(ctx, '/');
        }

        return {};
    }
    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>Login - Blogly</title>
                </Head>
                <View />
            </React.Fragment>
        );
    }
}

export default Login;
