/**
 * ./src/components/login/view/login
 */

import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="signup-section section center z-depth-1">
            <div className="heading">
                <h5>Join MedBlog</h5>
                <p>
                    Create an account to follow your favorite authors and
                    publications, applaud stories you love, and more.
                </p>
            </div>

            <div className="login-form">
                <form className="row">
                    <div className="input-field col s12">
                        <input type="text" placeholder="Your email" />
                    </div>
                    <div className="input-field col s12">
                        <input type="text" placeholder="Your full name" />
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
                    Have an account?
                    <Link to="/auth/login" title="Sign Up">
                        {' '}
                        Login up
                    </Link>
                </p>
                <p>
                    <a title="Terms of service">Terms of service</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
