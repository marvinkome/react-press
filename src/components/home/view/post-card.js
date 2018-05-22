/**
 * ./src/components/home/view/post-card
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { truncate, format_date } from '../../../js/helpers';
import defImg from '../../../img/default-pic.png';

const PostCard = ({ post }) => {
    const truncate_length =
        post.postPicUrl != undefined && post.postPicUrl != ''
            ? 20
            : 40;
    const cardStyle =
        post.postPicUrl != undefined && post.postPicUrl != ''
            ? {
                height: '240px',
                maxHeight: '240px'
            }
            : {};

    const imgStyle =
        post.author.gravatarUrl != null &&
        post.author.gravatarUrl != ''
            ? {
                borderRadius: '50%',
                backgroundColor: '#fafafa'
            }
            : {};
    const img =
        post.author.gravatarUrl != undefined &&
        post.author.gravatarUrl != ''
            ? post.author.gravatarUrl
            : defImg;

    return (
        <div className="card">
            <div className="card-image">
                {post.postPicUrl != undefined &&
                    post.postPicUrl != '' && (
                    <img src={post.postPicUrl} />
                )}
            </div>
            <Link to={'/post/' + post.id}>
                <div className="card-content" style={cardStyle}>
                    <span className="card-title">{post.title}</span>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: truncate(
                                post.body,
                                truncate_length
                            )
                        }}
                    />
                </div>
            </Link>
            <div className="card-action">
                <div className="author">
                    <div className="author-image">
                        <img
                            className="circle"
                            src={img}
                            style={imgStyle}
                        />
                    </div>
                    <div className="info">
                        <span className="name">
                            {post.author != null
                                ? post.author.fullName
                                : undefined}
                        </span>
                        <span className="date">
                            {format_date(post.timestamp)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.object.isRequired
};

export default PostCard;
