/**
 * ./src/components/admin/new-post/view
 */

import React from 'react';
import types from 'prop-types';
import Body from './body';
import './style.less';

const View = (props) => {
    return (
        <div>
            <Body post_id={props.id} />
        </div>
    );
};

View.propTypes = {
    id: types.string
};

export default View;
