/**
 * ./src/components/login/view
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';

const View = ({ section }) => {
    let section_el = <Redirect to="/" />;

    if (section == 'signup') {
        section_el = <SignUp />;
    } else if (section == 'login') {
        section_el = <Login />;
    }
    return (
        <div>
            <div className="auth">
                <div className="container">{section_el}</div>
            </div>
        </div>
    );
};

View.propTypes = {
    section: PropTypes.string
};

export default View;
