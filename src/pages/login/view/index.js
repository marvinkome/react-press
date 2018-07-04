import React from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';

import { getFromStore } from '../../../lib/storage';
import { tokenKey } from '../../../keys/storage';
import { LoginForm } from '../../../components/forms';
import { setupNotification } from '../../../store/actions-creators';
import { login_user, fetch_user_data } from '../../../store/actions';

export class PageView extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
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
            const res = await this.props.login_user(this.state);
            if (res.payload.msg == 'Authentication successfull') {
                const token = getFromStore(tokenKey);
                await this.props.fetch_data(token);
                await this.props.setupNotification(token);
                await Router.back();
            } else {
                this.setState({
                    auth_message: res.payload.msg
                });
            }
        } catch (e) {
            this.setState({
                auth_message:
                    String(e) == 'TypeError: Failed to fetch' ? 'Can\'t login server error' : ''
            });
        }
    };
    render() {
        return (
            <div className="auth auth-login">
                <div className="container">
                    <div className="login-section section center z-depth-1">
                        <div className="heading">
                            <h5>Welcome Back</h5>
                            <p>
                                Sign in to share your story with the world, appreciate stories you
                                love, and more.
                            </p>
                        </div>

                        <div className="login-form">
                            <LoginForm
                                emailValue={this.state.email}
                                passwordValue={this.state.password}
                                onChange={this.handleChange}
                                loggingIn={this.props.isLoggingIn}
                                auth_message={this.state.auth_message}
                                onSubmit={this.handleSubmit}
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
    }
}

PageView.propTypes = {
    isLoggingIn: types.bool,
    login_user: types.func,
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
        login_user: (data) => dispatch(login_user(data)),
        fetch_data: (token) => dispatch(fetch_user_data(token)),
        setupNotification: (token) => dispatch(setupNotification(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageView);
