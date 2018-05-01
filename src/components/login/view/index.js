/**
 * ./src/components/login/view
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Err404 } from '../../helpers/errors';
import Login from './login';
import SignUp from './signup';

const View = ({ section, history }) => {
    let section_el = <Err404 />;

    if (section == 'signup') {
        section_el = (
            <div>
                <div className="auth">
                    <div className="container">
                        <SignUp history={history} />
                    </div>
                </div>
            </div>
        );
    } else if (section == 'login') {
        section_el = (
            <div>
                <div className="auth">
                    <div className="container">
                        <Login history={history} />
                    </div>
                </div>
            </div>
        );
    }
    return section_el;
};

View.propTypes = {
    section: PropTypes.string,
    history: PropTypes.object
};

export default View;
