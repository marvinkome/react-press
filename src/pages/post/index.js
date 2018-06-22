/**
 * ./src/components/Post
 */

import React, { Component } from 'react';
import type from 'prop-types';
import { connect } from 'react-redux';

import PageBody from './view';
import './style.less';

class Post extends Component {
    constructor(props) {
        super(props);
    }
    static async getInitialProps({ query }) {
        const post_id = query.id.split('-').pop();
        return {
            post_id
        };
    }
    findPost = () => {
        const { posts, post_id } = this.props;
        let post = undefined;

        if (posts.length > 0) {
            post = posts.find((obj) => obj.node.id === post_id);
        }

        return post;
    };
    render() {
        const post = this.findPost();
        return <PageBody post={post} />;
    }
}

Post.propTypes = {
    posts: type.array,
    post_id: type.string
};

const mapStateToProps = (state) => ({
    posts: state.post_data.posts,
    user: state.user_data,
    fetching: state.isFetching
});

export default connect(mapStateToProps)(Post);
