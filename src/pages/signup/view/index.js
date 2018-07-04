import React from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';

import { getFromStore } from '../../../lib/storage';
import { tokenKey } from '../../../keys/storage';
import { SignupForm } from '../../../components/forms';
import { setupNotification } from '../../../store/actions-creators';
import { register_user, fetch_user_data } from '../../../store/actions';
import { validate_password } from '../../../lib/helpers';

export class PageView extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            full_name: '',
            password: '',
            auth_message: ''
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

        try {
            const res = await this.props.register_user(this.state);
            if (res.payload.msg == 'Authentication successfull') {
                const token = getFromStore(tokenKey);
                await this.props.fetch_data();
                await this.props.setupNotification(token);
                await Router.back();
            } else {
                this.setState({
                    auth_message: res.payload.msg
                });
            }
        } catch (error) {
            this.setState({
                auth_message:
                    String(error) == 'TypeError: Failed to fetch' && 'Can\'t login server error'
            });
        }
    };
    render() {
        const password = this.state.password;
        let button_class = 'btn';
        let input_class = '';

        if (!validate_password(password)) {
            button_class = button_class + ' disabled';
            input_class = input_class + ' invalid';
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
                                emailValue={this.state.email}
                                nameValue={this.state.full_name}
                                passwordValue={this.state.password}
                                onChange={this.handleChange}
                                loggingIn={this.props.isLoggingIn}
                                auth_message={this.state.auth_message}
                                onSubmit={this.handleSubmit}
                                button_class={button_class}
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
    isLoggingIn: types.bool,
    register_user: types.func,
    fetch_data: types.func,
    setupNotification: types.func
};

const mapStateToProps = (state) => {
    return {
        isLoggingIn: state.isLoggingIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register_user: (data) => dispatch(register_user(data)),
        fetch_data: () => dispatch(fetch_user_data()),
        setupNotification: (token) => dispatch(setupNotification(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageView);
