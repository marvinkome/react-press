import React from 'react';
import types from 'prop-types';
import Link from 'next/link';
import { format_date, truncate, get_page_link } from '../../../../lib/helpers';

export const Post = ({ post, handleDelete }) => {
    const pageLink = get_page_link(post.node.title, post.node.id);

    return (
        <div className="post">
            <div className="post-title">
                <Link as={`/p/${pageLink}`} href={`/post?id=${pageLink}`}>
                    <a>
                        <h5>{post.node.title}</h5>
                    </a>
                </Link>
            </div>

            <div className="body">
                <div
                    className="body"
                    dangerouslySetInnerHTML={{
                        __html: truncate(post.node.body, 30)
                    }}
                />
            </div>

            <div className="meta">
                <span>Published {format_date(post.node.timestamp)}</span>

                <span className="divider-dot" />

                <Link href={'/admin/edit-post/' + post.node.id}>
                    <a>
                        <span className="edit">Edit Post</span>
                    </a>
                </Link>

                <span className="divider-dot" />

                <span onClick={() => handleDelete(post.node.uuid)} className="delete">
                    Delete Post
                </span>
            </div>
        </div>
    );
};

Post.propTypes = {
    post: types.object.isRequired,
    handleDelete: types.func.isRequired
};
