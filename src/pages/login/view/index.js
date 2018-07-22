import React from 'react';
import types from 'prop-types';
import cookie from 'cookie';
import Link from 'next/link';
import { Mutation, withApollo } from 'react-apollo';
import { LoginForm } from '../../../components/forms';
import { tokenKey } from '../../../keys';
import redirect from '../../../lib/redirect';
import mutation from './query';

export const PageView = ({ client }) => {
    const onCompleted = (data) => {
        document.cookie = cookie.serialize(tokenKey, data.loginUser.token, {
            maxAge: 30 * 24 * 60 * 60 // 30 days
        });

        client.resetStore().then(() => redirect({}, '/'));
    };

    const handleSubmit = (e, loginUser) => {
        e.preventDefault();
        e.stopPropagation();
        let email = e.target['email'];
        let password = e.target['password'];

        loginUser({
            variables: {
                email: email.value,
                password: password.value
            }
        });

        email.value = password.value = '';
    };

    return (
        <Mutation mutation={mutation} onCompleted={onCompleted}>
            {(loginUser, { loading, error }) => {
                const err =
                    error &&
                    error
                        .toString()
                        .split(':')
                        .pop();

                return (
                    <div className="auth auth-login">
                        <div className="container">
                            <div className="login-section section center z-depth-1">
                                <div className="heading">
                                    <h5>Welcome Back</h5>
                                    <p>
                                        Sign in to share your story with the world, appreciate
                                        stories you love, and more.
                                    </p>
                                </div>

                                <div className="login-form">
                                    <LoginForm
                                        loggingIn={loading}
                                        auth_message={err}
                                        onSubmit={(e) => handleSubmit(e, loginUser)}
                                    />
                                </div>

                                <div className="extra-info">
                                    <p>
                                        Don{'\''}t have an account?
                                        <Link href="/signup">
                                            <a> Signup</a>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Mutation>
    );
};

PageView.propTypes = {
    client: types.object
};

export default withApollo(PageView);
