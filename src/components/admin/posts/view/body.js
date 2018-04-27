/**
 * ./src/components/admin/dashboard
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { delete_post } from '../../../../js/redux/actions';
import { format_date } from '../../../../js/helpers';

const mapStateToProps = state => ({
    data: state.user_data
});

const mapDispatchToProps = dispatch => ({
    delete_post: post_id => dispatch(delete_post(post_id))
});

class Body extends Component {
    handleDelete(id) {
        const confirmDelete = confirm('This post will be permanently deleted');
        if (confirmDelete == true) {
            this.props.delete_post(id);
        }
    }
    render() {
        const device_width = window.innerWidth;
        const data = this.props.data.data;
        if (data != undefined) {
            data.user.posts.edges.sort((a, b) => {
                if (a.node.timestamp > b.node.timestamp) {
                    return -1;
                }
                if (a.node.timestamp < b.node.timestamp) {
                    return 1;
                }
                return 0;
            });
        }

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
                                data.user.posts.edges.length > 0 ? (
                                    <table className="striped">
                                        <thead>
                                            <tr>
                                                <th>Tilte</th>
                                                <th>Tags</th>
                                                <th>Date Published</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.user.posts.edges.map(post => (
                                                <tr key={post.node.id}>
                                                    <td className="big">
                                                        <p>
                                                            {post.node.title}{' '}
                                                        </p>
                                                    </td>
                                                    <td className="big">
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
                                                    </td>
                                                    <td className="big">
                                                        <p>
                                                            {format_date(
                                                                post.node
                                                                    .timestamp
                                                            )}{' '}
                                                        </p>
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
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="container">
                                        <h6 className="center">No Posts</h6>
                                    </div>
                                )
                            ) : data.user.posts.edges.length > 0 ? (
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
                                                    <p>
                                                        {format_date(
                                                            post.node.timestamp
                                                        )}{' '}
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
                            ) : (
                                <div className="container">
                                    <h6 className="center">No Posts</h6>
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
    delete_post: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
