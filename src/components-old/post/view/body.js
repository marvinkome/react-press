/**
 * ./src/components/post/view/body
 */

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import types from 'prop-types';
import { connect } from 'react-redux';

import { clap, add_comment, reply_comment, view_page } from '../../../js/redux/actions';
import history from '../../../js/history';

import PostCard from './post-card';
import AuthorInfo from './author-info';
import Comment from './comment';
import FAB from './fab';
import Preloader from '../../helpers/preloader';

import { DEFAULT_TITLE } from '../../helpers/constants';
import Img from '../../../img/404.png';

export class Body extends Component {
    constructor(props) {
        super(props);
        this.fabRef = React.createRef();
    }
    componentDidMount() {
        const post = this.findPost();

        if (post !== undefined) {
            document.title = post.node.title + ' - ' + DEFAULT_TITLE;
            this.props.page_viewed(post.node.uuid);
        }
    }
    findPost = () => {
        const { posts, post_id } = this.props;
        let post = undefined;

        if (posts.length > 0) {
            post = posts.find((obj) => obj.node.id === post_id);
        }

        return post;
    };
    onClap = async () => {
        const post = this.findPost();
        const { user } = this.props;

        if (user.data !== undefined && post !== undefined) {
            const data = {
                post_id: post.node.uuid,
                user_id: user.data.user.uuid
            };

            try {
                await this.props.clap(data);
            } catch (e) {
                const toastHTML = ReactDOMServer.renderToStaticMarkup(
                    <div ref={this.toast}>
                        <span>Oopps there{'\''}s an error </span>
                    </div>
                );
                window.M.toast({
                    html: toastHTML,
                    displayLength: 4000
                });
            }
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
    onCommitPublish = async (comment) => {
        const { user } = this.props;
        const post = this.findPost();

        if (user.data !== undefined && post !== undefined) {
            const data = {
                body: comment,
                post_id: post.node.uuid,
                user_id: user.data.user.uuid
            };

            try {
                await this.props.comment(data);
            } catch (e) {
                const toastHTML = ReactDOMServer.renderToStaticMarkup(
                    <div ref={this.toast}>
                        <span>Oopps there{'\''}s an error </span>
                    </div>
                );
                window.M.toast({
                    html: toastHTML,
                    displayLength: 4000
                });
            }
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
    onCommentReply = async (comment, parent_id) => {
        const { user } = this.props;
        const post = this.findPost();

        if (user.data != undefined && post != undefined) {
            const data = {
                body: comment,
                parent_id,
                user_id: user.data.user.uuid,
                post_id: post.node.uuid
            };

            try {
                await this.props.reply_comment(data);
            } catch (e) {
                const toastHTML = ReactDOMServer.renderToStaticMarkup(
                    <div ref={this.toast}>
                        <span>Oopps there{'\''}s an error </span>
                    </div>
                );
                window.M.toast({
                    html: toastHTML,
                    displayLength: 4000
                });
            }
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
    renderLoader = () => (
        <div className="col s12">
            <Preloader />
        </div>
    );
    renderPost = (post) => (
        <div className="section">
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
                <FAB handleClap={this.onClap} claps_count={post.node.claps.totalCount} />
            </div>
        </div>
    );
    render404Err = () => (
        <div className="container">
            <div className="center-align">
                <img className="responsive-img" src={Img} />
            </div>
            <h5 className="center">
                I suggest you{' '}
                <a onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                    go back
                </a>
            </h5>
        </div>
    );
    render() {
        const post = this.findPost();

        return (
            <div className="post-body section container">
                <div className="row">
                    {this.props.fetching
                        ? this.renderLoader()
                        : post != undefined
                            ? this.renderPost(post)
                            : this.render404Err()}
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
    reply_comment: types.func.isRequired,
    page_viewed: types.func.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.post_data.posts,
    user: state.user_data,
    fetching: state.isFetching
});

const mapDispatchToProps = (dispatch) => ({
    clap: (data) => dispatch(clap(data)),
    comment: (data) => dispatch(add_comment(data)),
    reply_comment: (data) => dispatch(reply_comment(data)),
    page_viewed: (data) => dispatch(view_page(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
