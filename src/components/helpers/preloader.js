/**
 * ./src/components/home/view/preloader
 */

import React from 'react';
import t from 'prop-types';

const Preloader = () => (
    <div className="center">
        <h5>Getting posts...</h5>
    </div>
);

export const AppLoading = ({ error, pastDelay, timedOut, admin }) => (
    <div className="section container valign-wrapper" style={{ height: '100vh' }}>
        <div
            style={{
                margin: 'auto',
                width: '50%',
                marginLeft: admin ? '40%' : 'inherit'
            }}
        >
            <div className="center-align app-loader">
                {error ? (
                    <div className="error">
                        <h5>Error Loading. Please check you internet conection and reload</h5>
                    </div>
                ) : (
                    pastDelay && (
                        <div>
                            <div
                                className="progress"
                                style={{
                                    backgroundColor: '#90caf94f'
                                }}
                            >
                                <div
                                    className="indeterminate"
                                    style={{
                                        backgroundColor: '#0e66af'
                                    }}
                                />
                            </div>
                            <h5>{timedOut ? 'Sorry for taking long...' : 'Loading...'}</h5>
                        </div>
                    )
                )}
            </div>
        </div>
    </div>
);

AppLoading.propTypes = {
    error: t.object,
    timedOut: t.bool,
    pastDelay: t.bool,
    admin: t.bool
};

export default Preloader;
