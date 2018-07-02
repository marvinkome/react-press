import React from 'react';
import types from 'prop-types';
import Link from 'next/link';
import { get_profile_link, format_date } from '../../../../lib/helpers';

export const CommentReply = ({ reply }) => {
    const showImage = reply.node.author.gravatarUrl != null && reply.node.author.gravatarUrl != '';
    const profileLink = get_profile_link(reply.node.author.fullName, reply.node.author.id);

    return (
        <li className="collection-item">
            <div className="comment-author row">
                <div className="comment-author-image col s4 m3 l1">
                    <img
                        src={showImage ? reply.node.author.gravatarUrl : '/static/default-pic.png'}
                        alt={reply.node.author.fullName}
                        className="responsive-img circle"
                    />
                </div>
                <div className="comment-author-info col s8 m9 l11">
                    <Link href={profileLink}>
                        <a title="View Profile">
                            <p className="title">{reply.node.author.fullName}</p>
                        </a>
                    </Link>
                    <span className="post-meta">{format_date(reply.node.timestamp)}</span>
                </div>
            </div>

            <div className="comment-resp">{reply.node.body}</div>
        </li>
    );
};

CommentReply.propTypes = {
    reply: types.object
};

export default CommentReply;
