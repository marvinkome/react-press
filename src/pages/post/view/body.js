import React from 'react';
import types from 'prop-types';

import PostCard from './post-card';
import AuthorInfo from './author-info';
import Comment from './comment';
import FAB from './fab';
import Pagination from './pagination';

export const PostBody = ({ post, onClap, onComment, onCommentReply }) => {
    return (
        <div className="post-body section container">
            <div className="row">
                <div className="section">
                    <div className="col m11">
                        <AuthorInfo data={post} />

                        <PostCard data={post} />

                        <Comment
                            data={post.comments}
                            handleComment={onComment}
                            handleReply={onCommentReply}
                        />

                        <Pagination nextTitle={post.nextTitle} prevTitle={post.prevTitle}/>
                    </div>
                    <div className="col m1">
                        <FAB claps_count={post.claps.totalCount} onClap={onClap} />
                    </div>
                </div>
            </div>
        </div>
    );
};

PostBody.propTypes = {
    post: types.object,
    onClap: types.func.isRequired,
    onComment: types.func.isRequired,
    onCommentReply: types.func.isRequired
};

export default PostBody;
