/**
 * ./src/components/post/view/body
 */

import React, { Component } from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';

import { clap, add_comment, reply_comment } from '../../../js/redux/actions';
import history from '../../../js/history';

import Preloader from './preloader';
import PostCard from './post-card';
import AuthorInfo from './author-info';
import Comment from './comment';
import FAB from '../../helpers/fab';

const mapStateToProps = state => ({
    posts: state.post_data.posts,
    user: state.user_data,
    fetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
    clap: data => dispatch(clap(data)),
    comment: data => dispatch(add_comment(data)),
    reply_comment: data => dispatch(reply_comment(data))
});

class Body extends Component {
    constructor(props) {
        super(props);
        this.fabRef = React.createRef();
    }
    onClap = () => {
        const { posts, post_id } = this.props;

        let post = undefined;

        if (posts.length != 0) {
            post = posts.find(obj => obj.node.id == post_id);
        }

        if (this.props.user.data != undefined && post != undefined) {
            const data = {
                post_id: post.node.uuid,
                user_id: this.props.user.data.user.uuid
            };

            this.props.clap(data);
        } else {
            const toastHTML = `
                <div>
                    <span>You must be logged in to clap</span>
                </div>
            `;
            window.M.toast({
                html: toastHTML,
                displayLength: 2000
            });
            history.push('/auth/login');
        }
    };
    onCommitPublish = comment => {
        const { posts, post_id } = this.props;

        let post = undefined;

        if (posts.length != 0) {
            post = posts.find(obj => obj.node.id == post_id);
        }

        if (this.props.user.data != undefined && post != undefined) {
            const data = {
                body: comment,
                post_id: post.node.uuid,
                user_id: this.props.user.data.user.uuid
            };
            this.props.comment(data);
        } else {
            const toastHTML = `
                <div>
                    <span>You must be logged in to comment on posts</span>
                </div>
            `;
            window.M.toast({
                html: toastHTML,
                displayLength: 2000
            });
            history.push('/auth/login');
        }
    };
    onCommentReply = (comment, parent_id) => {
        const { posts, post_id } = this.props;

        let post = undefined;

        if (posts.length != 0) {
            post = posts.find(obj => obj.node.id == post_id);
        }

        if (this.props.user.data != undefined && post != undefined) {
            const data = {
                body: comment,
                parent_id,
                user_id: this.props.user.data.user.uuid,
                post_id: post.node.uuid
            };
            this.props.reply_comment(data);
        } else {
            const toastHTML = `
                <div>
                    <span>You must be logged in to reply to comments</span>
                </div>
            `;
            window.M.toast({
                html: toastHTML,
                displayLength: 2000
            });
            history.push('/auth/login');
        }
    };
    render() {
        const { posts, post_id } = this.props;

        let post = undefined;

        if (posts.length != 0) {
            post = posts.find(obj => obj.node.id == post_id);
        }

        return (
            <div className="post-body section container">
                <div className="row">
                    {this.props.fetching ? (
                        <div className="col m12 center-align preloader-cont circle">
                            <Preloader />
                        </div>
                    ) : (
                        post != undefined && (
                            <div>
                                <div className="col m11">
                                    <AuthorInfo data={post.node} />

                                    <PostCard data={post.node} />

                                    <Comment
                                        handleComment={this.onCommitPublish}
                                        handleReply={this.onCommentReply}
                                        data={post.node.comments}
                                    />
                                </div>
                                <div className="col m1">
                                    <FAB
                                        handleClap={this.onClap}
                                        claps_count={post.node.claps.totalCount}
                                    />
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

Body.propTypes = {
    post_id: types.string,
    user: types.object,
    posts: types.array.isRequired,
    fetching: types.bool.isRequired,
    clap: types.func.isRequired,
    comment: types.func.isRequired,
    reply_comment: types.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
