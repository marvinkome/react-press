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

export const AppLoading = ({ error, pastDelay, timedOut }) => (
    <div className="section container">
        <div className="row">
            <div className="col m12 center-align preloader-cont app-loader circle">
                {error ? (
                    <div className="error">
                        <i className="fa fa-times-circle-o fa-4x red-text" />
                        <h5>Error Loading</h5>
                    </div>
                ) : (
                    pastDelay && (
                        <div>
                            <div className="preloader-wrapper small active">
                                <div className="spinner-layer spinner-blue-only">
                                    <div className="circle-clipper left">
                                        <div className="circle" />
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle" />
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle" />
                                    </div>
                                </div>
                            </div>
                            <h5>
                                {timedOut
                                    ? 'Sorry for taking long...'
                                    : 'Loading...'}
                            </h5>
                        </div>
                    )
                )}
            </div>
        </div>
    </div>
);

AppLoading.propTypes = {
    error: t.bool,
    timedOut: t.bool,
    pastDelay: t.bool
};

export default Preloader;
