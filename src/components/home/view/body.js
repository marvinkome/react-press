/**
 * ./src/components/home/view/body
 */

import React from 'react';
import type from 'prop-types';

import { connect } from 'react-redux';

import PostCard from './post-card';
import Preloader from './preloader';

const mapStateToProps = state => ({
    fetching: state.isFetching,
    posts: state.post_data.posts
});

const Body = ({ posts, fetching }) => {
    return (
        <div className="body section container">
            <div className="row">
                {fetching ? (
                    <div className="col m12 center-align preloader-cont circle">
                        <Preloader />
                    </div>
                ) : posts.length > 0 ? (
                    posts.map(obj => (
                        <div key={obj.id} className="col l4 m6">
                            <PostCard post={obj} />
                        </div>
                    ))
                ) : (
                    <div className="col m12">
                        <h5 className="center">No posts</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

Body.propTypes = {
    fetching: type.bool.isRequired,
    posts: type.array.isRequired
};

export default connect(mapStateToProps)(Body);
