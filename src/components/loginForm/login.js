import React from 'react';
import types from 'prop-types';
// import Link from 'next/link';

export const LoginForm = ({ onSubmit, onChange, loggingIn, auth_message, ...props }) => {
    return (
        <form className="row" onSubmit={onSubmit}>
            <div className="input-field col s12">
                <input
                    value={props.emailValue}
                    type="text"
                    id="email"
                    placeholder="Your email"
                    onChange={onChange}
                />
            </div>
            <div className="input-field col s12">
                <input
                    value={props.passwordValue}
                    type="password"
                    id="password"
                    placeholder="Your password"
                    onChange={onChange}
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

LoginForm.propTypes = {
    onSubmit: types.func,
    onChange: types.func,
    loggingIn: types.bool,
    auth_message: types.string,
    emailValue: types.string,
    passwordValue: types.string
};

export default LoginForm;
