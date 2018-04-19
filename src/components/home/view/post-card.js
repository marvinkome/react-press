/**
 * ./src/components/home/view/post-card
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { truncate, format_date } from '../../../js/helpers';

const PostCard = ({ post }) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={post.postPicUrl} />
            </div>
            <div className="card-content">
                <Link to={'/post/' + post.id}>
                    <span className="card-title">{post.title}</span>
                </Link>
                <p>{truncate(post.body, 40)}</p>
            </div>
            <div className="card-action">
                <div className="author">
                    <div className="author-image">
                        <img className="circle" src={post.author.gravatarUrl} />
                    </div>
                    <div className="info">
                        <span className="name">{post.author.fullName}</span>
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
