import React from 'react';
import types from 'prop-types';
// import Link from 'next/link';

export const SignupForm = ({ onSubmit, loggingIn, auth_message, input_class }) => {
    return (
        <form onSubmit={onSubmit} className="row">
            <div className="input-field col s12">
                <input type="email" id="email" placeholder="Your email" required />
            </div>
            <div className="input-field col s12">
                <input type="text" id="full_name" placeholder="Your full name" required />
            </div>
            <div className="input-field col s12">
                <input
                    type="password"
                    id="password"
                    placeholder="Your password"
                    className={input_class}
                    required
                />
            </div>
            <div className="input-field col s12">
                <button type="submit" className="btn">
                    {!loggingIn ? (
                        'Submit'
                    ) : (
                        <div className="progress">
                            <div className="indeterminate" />
                        </div>
                    )}
                </button>
                <p className="red-text">{auth_message}</p>
            </div>
        </form>
    );
};

SignupForm.propTypes = {
    onSubmit: types.func,
    loggingIn: types.bool,
    auth_message: types.string,
    input_class: types.string
};

export default SignupForm;
