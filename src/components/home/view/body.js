/**
 * ./src/components/home/view/body
 */

import React from 'react';
import PropTypes from 'prop-types';
import PostCard from './post-card';

const Body = ({ posts }) => {
    return (
        <div className="body section container">
            <div className="row">
                {posts.map(obj => (
                    <div key={obj.uuid} className="col l4 m6">
                        <PostCard post={obj} />
                    </div>
                ))}
            </div>
        </div>
    );
};

Body.propTypes = {
    posts: PropTypes.array.isRequired
};

export default Body;
