/**
 * ./src/components/helpers/error
 */

import React from 'react';
import t from 'prop-types';
import { Link } from 'react-router-dom';
import Topbar from './topbar';
import img from './404-Error.png';

export const Err404 = ({ history }) => {
    return (
        <div>
            <Topbar />
            <div className="container">
                <div className="center-align">
                    <img className="responsive-img" src={img} />
                </div>
                <h5 className="center">
                    I suggest you{' '}
                    <a
                        onClick={() => history.goBack()}
                        style={{ cursor: 'pointer' }}
                    >
                        go back
                    </a>{' '}
                    {'or '}
                    <Link to="/">to homepage</Link>
                </h5>
            </div>
        </div>
    );
};

Err404.propTypes = {
    history: t.object
};
