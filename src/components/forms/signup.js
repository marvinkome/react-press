import React from 'react';
import types from 'prop-types';
// import Link from 'next/link';

export const SignupForm = ({ onSubmit, onChange, loggingIn, auth_message, ...props }) => {
    return (
        <form onSubmit={onSubmit} className="row">
            <div className="input-field col s12">
                <input
                    value={props.emailValue}
                    type="email"
                    id="email"
                    placeholder="Your email"
                    onChange={onChange}
                />
            </div>
            <div className="input-field col s12">
                <input
                    value={props.nameValue}
                    type="text"
                    id="full_name"
                    placeholder="Your full name"
                    onChange={onChange}
                />
            </div>
            <div className="input-field col s12">
                <input
                    value={props.passwordValue}
                    className={props.input_class}
                    type="password"
                    id="password"
                    placeholder="Your password"
                    onChange={onChange}
                />
            </div>
            <div className="input-field col s12">
                <button type="submit" className={props.button_class}>
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
    onChange: types.func,
    loggingIn: types.bool,
    auth_message: types.string,
    emailValue: types.string,
    passwordValue: types.string,
    nameValue: types.string,
    button_class: types.string,
    input_class: types.string
};

export default SignupForm;
