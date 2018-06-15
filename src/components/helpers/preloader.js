/**
 * ./src/components/home/view/preloader
 */

import React from 'react';
import t from 'prop-types';
import './preloader.less';

const Preloader = () => (
    <div className="center">
        <h5>Getting posts...</h5>
    </div>
);

export const AppLoading = ({ error, pastDelay, timedOut }) => (
    <div className="section container valign-wrapper apploading">
        <div className="center-loader">
            <div className="center-align app-loader">
                {error ? (
                    <div className="error">
                        <h5>Error Loading. Please check you internet conection and reload</h5>
                    </div>
                ) : (
                    pastDelay && (
                        <div>
                            <div className="progress">
                                <div className="indeterminate"/>
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
