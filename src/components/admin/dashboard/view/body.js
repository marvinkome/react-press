/**
 * ./src/components/admin/dashboard
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetch_user_data } from '../../../../js/redux/actions';

const mapStateToProps = state => ({
    data: state.user_data
});

const mapDispatchToProps = dispatch => ({
    fetch_data: () => dispatch(fetch_user_data())
});

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts_count: 0,
            comment_count: 0,
            comment_replies: 0
        };
    }
    componentWillReceiveProps(np) {
        this.setState({
            posts_count: np.data.data.user.posts.edges.length,
            comment_count: np.data.data.user.comments.edges.length,
            comment_replies: np.data.data.user.commentReplies.edges.length
        });
    }
    componentDidMount() {
        this.props.fetch_data();
    }
    render() {
        return (
            <div className="main dashboard">
                <div className="welcome-card dash-card z-depth-1">
                    <h5>Welcome to your Dashboard!</h5>
                    <p>Here are some quick actions</p>

                    <div className="actions-sec">
                        <div className="row">
                            <div className="col s12 ">
                                <p>
                                    <i className="fa fa-newspaper-o" />
                                    <Link
                                        to="/admin/new-post"
                                        title="Create a post"
                                    >
                                        {' '}
                                        Create post
                                    </Link>
                                </p>
                                <p>
                                    <i className="fa fa-commenting-o" />
                                    <Link
                                        to="/admin/edit-profile"
                                        title="Edit profile"
                                    >
                                        Edit profile
                                    </Link>
                                </p>
                                <p>
                                    <i className="fa fa-eye" />
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
                                    <i className="fa fa-newspaper-o" />
                                    {this.state.posts_count} blog posts
                                </p>
                            </div>
                            <div className="col m4 l3">
                                <p>
                                    <i className="fa fa-commenting-o" />
                                    {this.state.comment_count} comments
                                </p>
                            </div>
                            <div className="col m4 l3">
                                <p>
                                    <i className="fa fa-reply" />
                                    {this.state.comment_replies} comment replies
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
    data: PropTypes.object.isRequired,
    fetch_data: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
