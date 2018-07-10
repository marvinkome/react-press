import React from 'react';
import types from 'prop-types';
import Router from 'next/router';
import { Query } from 'react-apollo';

import Error from '../../../components/error';
import query from './query';
import PostBody from './body';
// import { createToast } from '../../../lib/helpers';

export class PageBody extends React.Component {
    // event handlers
    handleClap = async () => {
        // if (this.props.loggedIn === true) {
        //     const post_id = this.props.post.node.uuid;
        //     const clap_data = {
        //         post_id
        //     };
        //     try {
        //         await this.props.clap(clap_data);
        //     } catch (e) {
        //         createToast('There was an error, please try again');
        //     }
        // } else {
        //     createToast('Sign up or Login to appreciate this post');
        // }
    };
    handleComment = async (body) => {
        return body;
        // if (this.props.loggedIn === true) {
        //     const post_id = this.props.post.node.uuid;
        //     const comment_data = {
        //         body,
        //         post_id
        //     };

        //     try {
        //         await this.props.comment(comment_data);
        //     } catch (e) {
        //         createToast('There was an error, please try again');
        //     }
        // } else {
        //     createToast('Sign up or Login to comment on this post');
        // }
    };
    hadleCommentReply = async (body, parent_id) => {
        return body, parent_id;
        // if (this.props.loggedIn === true) {
        //     const post_id = this.props.post.node.uuid;
        //     const reply_data = {
        //         body,
        //         parent_id,
        //         post_id
        //     };

        //     try {
        //         await this.props.reply_comment(reply_data);
        //     } catch (e) {
        //         createToast('There was an error, please try again');
        //     }
        // } else {
        //     createToast('Sign up or Login to reply to this comment');
        // }
    };

    // render method
    renderError = () => {
        return (
            <Error
                render={
                    <div className="center">
                        <div className="center-align">
                            <img className="responsive-img" src="/static/404.png" />
                        </div>
                        <h5 className="center">
                            The content you{'\''}re looking for is currently not available
                        </h5>
                        <a onClick={() => Router.back()}>Go back to the previous page</a>
                    </div>
                }
            />
        );
    };
    render() {
        const { post_name } = this.props;
        return (
            <Query query={query} variables={{ post_name }}>
                {({ error, data}) => {
                    // if there's an error
                    if (error) return <Error render={<p>Error fetching post</p>} />;
                    
                    return data.post !== null ? <PostBody
                        post={data.post}
                        onClap={this.handleClap}
                        onComment={this.handleComment}
                        onCommentReply={this.hadleCommentReply}
                    />: this.renderError();
                }}
            </Query>
        );
    }
}

PageBody.propTypes = {
    post_name: types.string.isRequired,
    loggedIn: types.bool.isRequired
};

export default PageBody;
