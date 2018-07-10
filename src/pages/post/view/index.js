import React from 'react';
import types from 'prop-types';

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

    render() {
        const { post } = this.props;
        return (
            <PostBody
                post={post}
                onClap={this.handleClap}
                onComment={this.handleComment}
                onCommentReply={this.hadleCommentReply}
            />
        );
    }
}

PageBody.propTypes = {
    post: types.object.isRequired,
    loggedIn: types.bool.isRequired
};

export default PageBody;
