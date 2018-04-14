/**
 * ./src/components/home/view
 */

import React from 'react';
import PropTypes from 'prop-types';
import TopBar from './topbar';
import Body from './body';

const View = ({ data }) => {
    return (
        <div>
            <TopBar />
            <Body posts={data.posts} />
        </div>
    );
};

View.propTypes = {
    data: PropTypes.object.isRequired
};

export default View;
