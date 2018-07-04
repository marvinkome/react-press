import React from 'react';
import types from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { delete_post } from '../../../../store/actions';
import { sort_posts } from '../../../../lib/helpers';
import { Post } from './post';

class PageView extends React.Component {
    handleDelete = (id) => {
        const confirmDelete = confirm('This post will be permanently deleted');
        if (confirmDelete == true) {
            this.props.deletePost(id);
        }
    };
    render_page_header = () => {
        return (
            <div className="posts-info">
                <h1>Your posts</h1>
                <Link href={'/me/new-post'}>
                    <a className="btn btn-flat">New Post</a>
                </Link>
            </div>
        );
    };

    render_no_post = () => {
        return (
            <div className="container">
                <h5 className="center">No Posts</h5>
            </div>
        );
    };

    render_posts = (posts) => {
        posts = sort_posts(posts);
        return posts.map((post) => (
            <Post key={post.node.id} post={post} handleDelete={this.handleDelete} />
        ));
    };

    render() {
        const { edges } = this.props.data.data.user.posts;
        return (
            <div className="main admin-posts">
                {edges && (
                    <div>
                        {this.render_page_header()}
                        <div className="posts-list">
                            {edges.length > 0 ? this.render_posts(edges) : this.render_no_post()}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

PageView.propTypes = {
    data: types.object.isRequired,
    deletePost: types.func.isRequired
};

const mapStateToProps = (state) => ({
    data: state.user_data
});

const mapDispatchToProp = (dispatch) => ({
    delete_post: (id) => dispatch(delete_post(id))
});

export default connect(mapStateToProps, mapDispatchToProp)(PageView);
