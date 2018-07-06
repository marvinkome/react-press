import React, { Component } from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

import { MainPage } from '../../components/app';
import Error from '../../components/error';
import PageBody from './view';
import './style.less';

export class Post extends Component {
    constructor(props) {
        super(props);
    }
    static async getInitialProps({ query }) {
        query = decodeURIComponent(query.id);
        const post_data = query.split('-');
        const post_id = post_data.pop();
        const post_name = post_data.join('-');
        return {
            post_id,
            post_name
        };
    }
    findPost = () => {
        const { posts, post_id, post_name } = this.props;
        let post = undefined;

        if (posts.length > 0) {
            post = posts.find(
                (obj) =>
                    obj.node.id === post_id &&
                    obj.node.title
                        .toLowerCase()
                        .split(' ')
                        .join('-') === post_name
            );
        }

        return post;
    };
    renderError = () => {
        return (
            <Error
                render={
                    <div className="center">
                        <div className="center-align">
                            <img className="responsive-img" src="/static/404.png" />
                        </div>
                        <h5 className="center">
                            The content you{'\''}re looking for is currently not available
                        </h5>
                        <a onClick={() => Router.back()}>Go back to the previous page</a>
                    </div>
                }
            />
        );
    };
    render() {
        const post = this.findPost();
        return (
            <MainPage
                loggedIn={this.props.loggedIn}
                pageTitle={post !== undefined ? post.node.title : 'Post not found'}
                render={() =>
                    post !== undefined ? (
                        <PageBody post={post} loggedIn={this.props.loggedIn} />
                    ) : (
                        this.renderError()
                    )
                }
            />
        );
    }
}

Post.propTypes = {
    loggedIn: types.bool.isRequired,
    posts: types.array.isRequired,
    post_id: types.string.isRequired,
    post_name: types.string.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.post_data.posts,
    user: state.user_data
});

export default connect(mapStateToProps)(Post);
