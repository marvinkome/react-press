/**
 * ./src/components/Post
 */

import React, { Component } from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';

import { MainPage } from '../../components/app';
import PageBody from './view';
import './style.less';

export class Post extends Component {
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
        return <MainPage 
            loggedIn={this.props.loggedIn} 
            render={() => <PageBody post={post} loggedIn={this.props.loggedIn} />}
        />;
    }
}

Post.propTypes = {
    loggedIn: types.bool,
    posts: types.array,
    post_id: types.string
};

const mapStateToProps = (state) => ({
    posts: state.post_data.posts,
    user: state.user_data
});

export default connect(mapStateToProps)(Post);
