/**
 * ./src/components/login/view/login
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { register_user } from '../../../js/redux/actions';
import { validate_password } from '../../../js/helpers';

const mapDispatchToProps = dispatch => {
    return {
        register_user: data => dispatch(register_user(data))
    };
};

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching
    };
};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
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
            this.props.register_user(this.state).then(
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
                            'Can\'t login server error'
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
        const password = this.state.password;
        let button_class = 'btn black white-text';
        let input_class = '';

        if (!validate_password(password)) {
            button_class = button_class + ' disabled';
            input_class = input_class + ' invalid';
        }

        return (
            <div className="signup-section section center z-depth-1">
                <div className="heading">
                    <h5>Join MedBlog</h5>
                    <p>
                        Create an account to follow your favorite authors and
                        publications, applaud stories you love, and more.
                    </p>
                    <p>
                        * Password must contain atleast one uppercase letter or
                        one number. And must be atleast 6 characters long
                    </p>
                </div>

                <div className="login-form">
                    <form onSubmit={this.handleSubmit} className="row">
                        <div className="input-field col s12">
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="full_name"
                                placeholder="Your full name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field col s12">
                            <input
                                className={input_class}
                                type="password"
                                id="password"
                                placeholder="Your password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field col s12">
                            <button type="submit" className={button_class}>
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
                        Have an account?
                        <Link to="/auth/login" title="Sign Up">
                            {' '}
                            Login
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

SignUp.propTypes = {
    register_user: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
