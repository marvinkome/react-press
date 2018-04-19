/**
 * ./src/components/home/view
 */

import React from 'react';
import TopBar from '../../helpers/topbar';
import Body from './body';

const View = () => {
    return (
        <div>
            <TopBar />
            <Body />
        </div>
    );
};

export default View;
