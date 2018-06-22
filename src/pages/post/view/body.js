import React from 'react';
import types from 'prop-types';

import PostCard from './post-card';
import AuthorInfo from './author-info';
import Comment from './comment';
import FAB from './fab';

export const PostBody = ({ post }) => {
    return (
        <div className="post-body section container">
            <div className="row">
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
            </div>
        </div>
    );
};

PostBody.propTypes = {
    post: types.object
};

export default PostBody;
