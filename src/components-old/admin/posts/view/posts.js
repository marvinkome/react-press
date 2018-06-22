import React from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';
import { format_date, truncate, sort_posts } from '../../../../js/helpers';

export class Posts extends React.Component {
    render() {
        const data = sort_posts(this.props.data.user.posts.edges);

        return data.map((post) => (
            <div className="post" key={post.node.id}>
                <div className="post-title">
                    <Link to={'/post/' + post.node.id}>
                        <h5>{post.node.title}</h5>
                    </Link>
                </div>
                <div className="body">
                    <div
                        className="body"
                        dangerouslySetInnerHTML={{
                            __html: truncate(post.node.body, 30)
                        }}
                    />
                </div>
                <div className="meta">
                    <span>Published {format_date(post.node.timestamp)}</span>
                    <span className="divider-dot" />
                    <Link to={'/admin/edit-post/' + post.node.id}>
                        <span className="edit">Edit Post</span>
                    </Link>
                    <span className="divider-dot" />
                    <span
                        onClick={() => this.props.handleDelete(post.node.uuid)}
                        className="delete"
                    >
                        Delete Post
                    </span>
                </div>
            </div>
        ));
    }
}

Posts.propTypes = {
    data: types.object.isRequired,
    handleDelete: types.func.isRequired
};
