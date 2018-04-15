/**
 * ./src/components/home/view/preloader
 */

import React from 'react';

const Preloader = () => (
    <div className="preloader-wrapper big active">
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
);

export default Preloader;
