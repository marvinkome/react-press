import React from 'react';
import cookie from 'cookie';
import types from 'prop-types';
import Link from 'next/link';
import { Mutation, withApollo } from 'react-apollo';

import { SignupForm } from '../../../components/forms';
import { tokenKey } from '../../../keys';
import redirect from '../../../lib/redirect';
import mutation from './query';

export const PageView = ({ client }) => {
    const onCompleted = (data) => {
        document.cookie = cookie.serialize(tokenKey, data.createUser.token, {
            maxAge: 30 * 24 * 60 * 60 // 30 days
        });

        client.resetStore().then(() => redirect({}, '/'));
    };

    const handleSubmit = (e, func) => {
        e.preventDefault();
        e.stopPropagation();
        let email = e.target['email'];
        let password = e.target['password'];
        let username = e.target['username'];
        let fullName = e.target['full_name'];

        func({
            variables: {
                email: email.value,
                password: password.value,
                username: username.value,
                fullName: fullName.value
            }
        });

        // email.value = password.value = username.value = fullName.value = '';
    };
    return (
        <Mutation mutation={mutation} onCompleted={onCompleted}>
            {(createUser, { loading, error }) => {
                const err =
                    error &&
                    error
                        .toString()
                        .split(':')
                        .pop();

                return (
                    <div className="auth auth-signup">
                        <div className="container">
                            <div className="signup-section section center z-depth-1">
                                <div className="heading">
                                    <h5>Join Blogly</h5>
                                    <p>
                                        Sign up to share your story with the world, appreciate
                                        stories you love, and more.
                                    </p>
                                    <p>
                                        * Password must contain atleast one uppercase letter or one
                                        number. And must be atleast 6 characters long
                                    </p>
                                </div>

                                <div className="login-form">
                                    <SignupForm
                                        loggingIn={loading}
                                        auth_message={err}
                                        onSubmit={(e) => handleSubmit(e, createUser)}
                                    />
                                </div>

                                <div className="extra-info">
                                    <p>
                                        Have an account?
                                        <Link href="/login">
                                            <a> Login</a>
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
