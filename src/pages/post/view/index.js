import React from 'react';
import types from 'prop-types';
import { Mutation, withApollo } from 'react-apollo';

import { clap, comment, replyComment } from './mutations';
import PostBody from './body';
import { createToast } from '../../../lib/helpers';

export const PageBody = ({ client, post, loggedIn }) => {
    const error = () => createToast('There was an error, please try again');

    // event handlers
    const handleClap = (clap) => {
        if (loggedIn) {
            const postId = post.uuid;
            clap({ variables: { postId } });
        } else {
            createToast('Sign up or Login to like this post');
        }
    };

    const handleComment = (body, comment) => {
        if (loggedIn) {
            const postId = post.uuid;
            comment({ variables: { postId, body } });
        } else {
            createToast('Sign up or Login to comment on this post');
        }
    };

    const hadleCommentReply = (body, parentId, replyComment) => {
        if (loggedIn) {
            replyComment({ variables: { parentId, body } });
        } else {
            createToast('Sign up or Login to reply to this comment');
        }
    };

    return (
        <Mutation mutation={clap} onError={error} onCompleted={() => client.resetStore()}>
            {(clapMutation) => (
                <Mutation
                    mutation={comment}
                    onError={error}
                    onCompleted={() => client.resetStore()}
                >
                    {(commentMutation) => (
                        <Mutation
                            mutation={replyComment}
                            onError={error}
                            onCompleted={() => client.resetStore()}
                        >
                            {(replyMutation) => (
                                <PostBody
                                    post={post}
                                    onClap={() => handleClap(clapMutation)}
                                    onComment={(body) => handleComment(body, commentMutation)}
                                    onCommentReply={(body, parent_id) =>
                                        hadleCommentReply(body, parent_id, replyMutation)
                                    }
                                />
                            )}
                        </Mutation>
                    )}
                </Mutation>
            )}
        </Mutation>
    );
};

PageBody.propTypes = {
    post: types.object.isRequired,
    loggedIn: types.bool.isRequired,
    client: types.object.isRequired
};

export default withApollo(PageBody);
