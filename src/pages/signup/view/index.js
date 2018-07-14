import React from 'react';
import types from 'prop-types';
import Link from 'next/link';

import { SignupForm } from '../../../components/forms';
import { validate_password } from '../../../lib/helpers';
import authRequests from '../../../api/authRequests';

export class PageView extends React.Component {
    constructor() {
        super();

        this.state = {
            loggingIn: false,
            auth_message: '',
            invalid_password: false
        };
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target['email'].value;
        const full_name = e.target['full_name'].value;
        const password = e.target['password'].value;

        if (!validate_password(password)) {
            this.setState({
                auth_message: 'please provide a valid password',
                invalid_password: true
            });
        }

        this.setState({
            loggingIn: true
        });

        try {
            await authRequests({
                email,
                full_name,
                password
            }).register();

            await this.setState({
                loggingIn: false
            });
        } catch (err) {
            this.setState({
                auth_message: 'Error creating your profile. Please try again',
                loggingIn: false
            });
        }
    };
    render() {
        let input_class = '';

        if (this.state.invalid_password) {
            input_class = input_class + 'invalid';
        }

        return (
            <div className="auth auth-signup">
                <div className="container">
                    <div className="signup-section section center z-depth-1">
                        <div className="heading">
                            <h5>Join ReactPress</h5>
                            <p>
                                Sign up to share your story with the world, appreciate stories you
                                love, and more.
                            </p>
                            <p>
                                * Password must contain atleast one uppercase letter or one number.
                                And must be atleast 6 characters long
                            </p>
                        </div>

                        <div className="login-form">
                            <SignupForm
                                loggingIn={this.state.loggingIn}
                                auth_message={this.state.auth_message}
                                onSubmit={this.handleSubmit}
                                input_class={input_class}
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
    }
}

PageView.propTypes = {
    isLoggingIn: types.bool
};

export default PageView;
