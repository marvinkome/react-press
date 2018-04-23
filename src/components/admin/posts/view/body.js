/**
 * ./src/components/admin/dashboard
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetch_user_data, delete_post } from '../../../../js/redux/actions';

const mapStateToProps = state => ({
    data: state.user_data
});

const mapDispatchToProps = dispatch => ({
    fetch_data: () => dispatch(fetch_user_data()),
    delete_post: post_id => dispatch(delete_post(post_id))
});

class Body extends Component {
    componentDidMount() {
        this.props.fetch_data();
    }
    handleDelete(id) {
        const confirmDelete = confirm('This post will be permanently deleted');
        if (confirmDelete == true) {
            this.props.delete_post(id).then(() => this.props.fetch_data());
        }
    }
    render() {
        const device_width = window.innerWidth;
        const data = this.props.data.data;
        return (
            <div className="main admin-posts">
                {data && (
                    <div>
                        <div className="posts-info">
                            <p>
                                <span>
                                    All ({data.user.posts.edges.length}){' '}
                                </span>
                            </p>
                        </div>
                        <div className="posts-list z-depth-1">
                            {device_width > 600 ? (
                                <table className="striped">
                                    <thead>
                                        <tr>
                                            <th>Tilte</th>
                                            <th>Tags</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.user.posts.edges.map(post => (
                                            <tr key={post.node.id}>
                                                <td className="big">
                                                    <p>{post.node.title} </p>
                                                </td>
                                                <td className="big">
                                                    {post.node.tags.edges.map(
                                                        tag => (
                                                            <span
                                                                key={
                                                                    tag.node.id
                                                                }
                                                            >
                                                                {tag.node.name},{' '}
                                                            </span>
                                                        )
                                                    )}
                                                </td>
                                                <td className="small">
                                                    <Link
                                                        to={
                                                            '/admin/edit-post/' +
                                                            post.node.id
                                                        }
                                                        title="Edit"
                                                    >
                                                        <span className="edit">
                                                            Edit
                                                        </span>
                                                    </Link>
                                                    <a
                                                        onClick={() =>
                                                            this.handleDelete(
                                                                post.node.uuid
                                                            )
                                                        }
                                                        title="Delete"
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <span className="delete">
                                                            Delete
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="mobile-list">
                                    <ul className="collection">
                                        {data.user.posts.edges.map(post => (
                                            <li
                                                key={post.node.id}
                                                className="collection-item"
                                            >
                                                <div className="post">
                                                    <h5>{post.node.title}</h5>
                                                    <p>
                                                        Tags:{' '}
                                                        {post.node.tags.edges.map(
                                                            tag => (
                                                                <span
                                                                    key={
                                                                        tag.node
                                                                            .id
                                                                    }
                                                                >
                                                                    {
                                                                        tag.node
                                                                            .name
                                                                    },{' '}
                                                                </span>
                                                            )
                                                        )}
                                                    </p>
                                                    <p className="actions">
                                                        <Link
                                                            to={
                                                                '/admin/edit-post/' +
                                                                post.node.id
                                                            }
                                                            title="Edit"
                                                        >
                                                            <span className="edit">
                                                                Edit
                                                            </span>
                                                        </Link>
                                                        <a
                                                            onClick={() =>
                                                                this.handleDelete(
                                                                    post.node
                                                                        .uuid
                                                                )
                                                            }
                                                            title="Delete"
                                                            style={{
                                                                cursor:
                                                                    'pointer'
                                                            }}
                                                        >
                                                            <span className="delete">
                                                                Delete
                                                            </span>
                                                        </a>
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Body.propTypes = {
    data: PropTypes.object.isRequired,
    fetch_data: PropTypes.func.isRequired,
    delete_post: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
