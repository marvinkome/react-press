/**
 * ./src/components/admin/dashboard
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Body = () => {
    const device_width = window.innerWidth;
    return (
        <div className="main admin-posts">
            <div className="posts-info">
                <p>
                    <span>All (9) |</span>
                    <span>Trash (0)</span>
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
                            <tr>
                                <td className="big">
                                    <p>How to make more responsive themes. </p>
                                </td>
                                <td className="big">
                                    posts, title, tags, actions, lorem, ipsum,
                                    etc, menu, description, website, or, topics,
                                    provided
                                </td>
                                <td className="small">
                                    <Link to="/admin/edit-post/1" title="Edit">
                                        <span className="edit">Edit</span>
                                    </Link>
                                    <a title="Delete">
                                        <span className="delete">Delete</span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <div className="mobile-list">
                        <ul className="collection">
                            <li className="collection-item">
                                <div className="post">
                                    <h5>Post Title</h5>
                                    <p>
                                        Tags:
                                        <span> posts, </span>
                                        <span>title, </span> <span>tags, </span>
                                        <span>actions, </span>
                                        <span>provided</span>
                                    </p>
                                    <p className="actions">
                                        <Link
                                            to="/admin/edit-post/1"
                                            title="Edit"
                                        >
                                            <span className="edit">Edit</span>
                                        </Link>
                                        <a title="Delete">
                                            <span className="delete">
                                                Delete
                                            </span>
                                        </a>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Body;
