/**
 * ./src/components/login/view/login
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="login-section section center z-depth-1">
            <div className="heading">
                <h5>Welcome Back</h5>
                <p>
                    Sign in, follow authors and topics you love, and clap for
                    stories that matter to you.
                </p>
            </div>

            <div className="login-form">
                <form className="row">
                    <div className="input-field col s12">
                        <input type="text" placeholder="Your email" />
                    </div>
                    <div className="input-field col s12">
                        <input type="password" placeholder="Your password" />
                    </div>
                    <div className="input-field col s12">
                        <button type="submit" className="btn black white-text">
                            Submit
                        </button>
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
};

export default Login;
