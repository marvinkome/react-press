import React from 'react';
import types from 'prop-types';

export const SignupForm = ({ onSubmit, loggingIn, auth_message }) => {
    return (
        <form onSubmit={onSubmit} className="row">
            <div className="input-field col s12">
                <input type="email" id="email" placeholder="Email" required />
            </div>
            <div className="input-field col s12">
                <input type="text" id="username" placeholder="Username" required />
            </div>
            <div className="input-field col s12">
                <input type="text" id="full_name" placeholder="Full Name" required />
            </div>
            <div className="input-field col s12">
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
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
    auth_message: types.string
};

export default SignupForm;
