/**
 * ./src/components/helpers/error
 */

import React from 'react';
import t from 'prop-types';
import Topbar from './topbar';

export const Err404 = ({ history }) => {
    return (
        <div>
            <Topbar />
            <div className="container">
                <div className="center-align">
                    <img
                        className="responsive-img"
                        src="./src/img/404-Error.png"
                    />
                </div>
                <h5 className="center">
                    I suggest you{' '}
                    <a
                        onClick={() => history.goBack()}
                        style={{ cursor: 'pointer' }}
                    >
                        go back
                    </a>
                </h5>
            </div>
        </div>
    );
};

Err404.propTypes = {
    history: t.object
};
