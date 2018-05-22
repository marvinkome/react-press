/**
 * ./src/components/admin/dashboard
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    data: state.user_data
});

class Body extends Component {
    render() {
        let post_count, comment_count, comment_replies;

        if (this.props.data.data != undefined) {
            post_count = this.props.data.data.user.posts.edges.length;
            comment_count = this.props.data.data.user.comments.edges
                .length;
            comment_replies = this.props.data.data.user.commentReplies
                .edges.length;
        } else {
            post_count = 0;
            comment_count = 0;
            comment_replies = 0;
        }

        return (
            <div className="main dashboard">
                <div className="welcome-card dash-card z-depth-1">
                    <h5>Welcome to your Dashboard!</h5>
                    <p>Here are some quick actions</p>

                    <div className="actions-sec">
                        <div className="row">
                            <div className="col s12 ">
                                <p>
                                    <span className="icon-bg">
                                        <i className="material-icons">
                                            fiber_new
                                        </i>
                                    </span>
                                    <Link
                                        to="/admin/new-post"
                                        title="Create a post"
                                    >
                                        {' '}
                                        Create post
                                    </Link>
                                </p>
                                <p>
                                    <span className="icon-bg">
                                        <i className="material-icons">
                                            account_circle
                                        </i>
                                    </span>
                                    <Link
                                        to="/admin/edit-profile"
                                        title="Edit profile"
                                    >
                                        Edit profile
                                    </Link>
                                </p>
                                <p>
                                    <span className="icon-bg">
                                        <i className="material-icons">
                                            open_in_new
                                        </i>
                                    </span>
                                    <Link to="/" title="View blog">
                                        View site
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stats-card dash-card z-depth-1">
                    <h5>Quick stats</h5>

                    <div className="actions-sec">
                        <div className="row">
                            <div className="col m4 l3">
                                <p>
                                    <span className="icon-bg">
                                        <i className="material-icons">
                                            fiber_new
                                        </i>
                                    </span>
                                    {post_count} blog posts
                                </p>
                            </div>
                            <div className="col m4 l3">
                                <p>
                                    <span className="icon-bg">
                                        <i className="material-icons">
                                            comment
                                        </i>
                                    </span>
                                    {comment_count} comments
                                </p>
                            </div>
                            <div className="col m4 l3">
                                <p>
                                    <span className="icon-bg">
                                        <i className="material-icons">
                                            reply
                                        </i>
                                    </span>
                                    {comment_replies} comment replies
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Body.propTypes = {
    data: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Body);
