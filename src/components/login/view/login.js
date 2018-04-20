/**
 * ./src/components/login/view/login
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { login_user } from '../../../js/redux/actions';

const mapDispatchToProps = dispatch => {
    return {
        login_user: data => dispatch(login_user(data))
    };
};

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching
    };
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            auth_message: ''
        };
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        if (navigator.onLine) {
            this.props.login_user(this.state).then(
                res => {
                    if (res.payload.msg == 'Authentication successfull') {
                        this.props.history.goBack();
                    } else {
                        this.setState({
                            auth_message: res.payload.msg
                        });
                    }
                },
                error => {
                    this.setState({
                        auth_message:
                            String(error) == 'TypeError: Failed to fetch' &&
                            'Can\'t login server'
                    });
                }
            );
        } else {
            this.setState({
                auth_message: 'You are offline'
            });
        }
    };
    render() {
        return (
            <div className="login-section section center z-depth-1">
                <div className="heading">
                    <h5>Welcome Back</h5>
                    <p>
                        Sign in, follow authors and topics you love, and clap
                        for stories that matter to you.
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
                            <button
                                type="submit"
                                className="btn black white-text"
                            >
                                {!this.props.isFetching ? (
                                    'Submit'
                                ) : (
                                    <div className="progress">
                                        <div className="indeterminate" />
                                    </div>
                                )}
                            </button>
                            <p className="red-text">
                                {this.state.auth_message}
                            </p>
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
                    <p>
                        <a title="Terms of service">Terms of service</a>
                    </p>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login_user: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
