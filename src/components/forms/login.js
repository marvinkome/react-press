import React from 'react';
import types from 'prop-types';

export const LoginForm = ({ onSubmit, loggingIn, auth_message }) => {
    return (
        <form className="row" onSubmit={onSubmit}>
            <div className="input-field col s12">
                <input type="text" id="email" placeholder="Your email" required />
            </div>
            <div className="input-field col s12">
                <input type="password" id="password" placeholder="Your password" required />
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
    loggingIn: types.bool,
    auth_message: types.string
};

export default LoginForm;
