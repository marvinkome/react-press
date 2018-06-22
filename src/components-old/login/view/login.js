/**
 * ./src/components/login/view/login
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { login_user, fetch_user_data } from '../../../js/redux/actions';

import { DEFAULT_TITLE } from '../../helpers/constants';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            auth_message: ''
        };
    }
    componentWillMount() {
        // Check if user is already logged in
        const sessionLogin = JSON.parse(localStorage.getItem('med-blog-logged-in'));
        const isLoggedin = sessionLogin !== undefined && sessionLogin === true;

        if (isLoggedin) {
            const toastHTML = `
                <div>
                    <span>You are already logged in</span>
                </div>
            `;
            window.M.toast({
                html: toastHTML,
                displayLength: 2000
            });
            this.props.history.goBack();
        }
    }
    componentDidMount() {
        document.title = 'Login - ' + DEFAULT_TITLE;
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
                await this.props.fetch_data();
                await this.props.history.goBack();
            } else {
                this.setState({
                    auth_message: res.payload.msg
                });
            }
        } catch (e) {
            this.setState({
                auth_message:
                    String(e) == 'TypeError: Failed to fetch' && 'Can\'t login server error'
            });
        }
    };
    render() {
        return (
            <div className="login-section section center z-depth-1">
                <div className="heading">
                    <h5>Welcome Back</h5>
                    <p>
                        Sign in to share your story with the world, appreciate stories you love, and
                        more.
                    </p>
                </div>

                <div className="login-form">
                    <form className="row" onSubmit={this.handleSubmit}>
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="email"
                                placeholder="Your email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field col s12">
                            <input
                                type="password"
                                id="password"
                                placeholder="Your password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field col s12">
                            <button type="submit" className="btn">
                                {!this.props.isLoggingIn ? (
                                    'Submit'
                                ) : (
                                    <div className="progress">
                                        <div className="indeterminate" />
                                    </div>
                                )}
                            </button>
                            <p className="red-text">{this.state.auth_message}</p>
                        </div>
                    </form>
                </div>

                <div className="extra-info">
                    <p>
                        No account?
                        <Link to="/auth/signup" title="Sign Up">
                            {' '}
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login_user: PropTypes.func.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
    fetch_data: PropTypes.func.isRequired,
    history: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {
    return {
        login_user: (data) => dispatch(login_user(data)),
        fetch_data: () => dispatch(fetch_user_data())
    };
};

const mapStateToProps = (state) => {
    return {
        isLoggingIn: state.isLoggingIn
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
