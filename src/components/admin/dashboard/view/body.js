/**
 * ./src/components/admin/dashboard
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    componentDidMount() {
        this.props.fetch_data();
    }
    render() {
        // const posts_count = this.state.posts_count;
        // const comment_count = this.state.comment_count;
        // const comment_replies = this.state.comment_replies;

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
                                    <a title="Create a post"> Create post</a>
                                </p>
                                <p>
                                    <i className="fa fa-commenting-o" />
                                    <a title="Moderate comments">
                                        Edit profile
                                    </a>
                                </p>
                                <p>
                                    <i className="fa fa-eye" />
                                    <a title="View blog">View blog</a>
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
                                    15 blog posts
                                </p>
                            </div>
                            <div className="col m4 l3">
                                <p>
                                    <i className="fa fa-commenting-o" />
                                    6 comments
                                </p>
                            </div>
                            <div className="col m4 l3">
                                <p>
                                    <i className="fa fa-reply" />
                                    5 comment replies
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
