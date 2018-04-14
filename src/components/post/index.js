/**
 * ./src/components/blog
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import View from './view';

const mapStateToProps = state => {
    return {
        data: state.data
    };
};

export const PostID = React.createContext();

class Post extends Component {
    render() {
        const post_id = this.props.match.params.id;
        const post = this.props.data.posts.find(obj => obj.uuid == post_id);
        return (
            <PostID.Provider value={post}>
                <View />
            </PostID.Provider>
        );
    }
}

Post.propTypes = {
    data: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Post);
