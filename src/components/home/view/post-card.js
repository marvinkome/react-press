/**
 * ./src/components/home/view/post-card
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src="./src/img/card.jpg" />
            </div>
            <div className="card-content">
                <Link to={'/post/' + post.uuid}>
                    <span className="card-title">{post.title}</span>
                </Link>
                <p>{post.body}</p>
            </div>
            <div className="card-action">
                <div className="author">
                    <div className="author-image">
                        <img className="circle" src="./src/img/pp.jpg" />
                    </div>
                    <div className="info">
                        <span className="name">{post.author.fullName}</span>
                        <span className="date">{post.timestamp} </span>
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
