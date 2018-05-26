/**
 * ./src/components/home/view/post-card
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format_date, get_profile_link } from '../../../js/helpers';
import defImg from '../../../img/default-pic.png';

const PostCard = ({ post }) => {
    const imgStyle =
        post.author.gravatarUrl != null && post.author.gravatarUrl != ''
            ? {
                borderRadius: '50%',
                backgroundColor: '#fafafa'
            }
            : {};
    const img =
        post.author.gravatarUrl != undefined && post.author.gravatarUrl != ''
            ? post.author.gravatarUrl
            : defImg;

    return (
        <div>
            <div className="post-card card horizontal">
                {post.postPicUrl != undefined && post.postPicUrl != '' && (
                    <div className="post-card__image card-image">
                        <img src={post.postPicUrl} />
                    </div>
                )}
                <div className="card-stacked">
                    <div className="card-content">
                        <h1 className="post-card__title">
                            <Link to={'/post/' + post.id} className="post-card__title--link">
                                {post.title}
                            </Link>
                        </h1>
                        <p className="post-card__text"
                            dangerouslySetInnerHTML={{
                                __html: post.body
                            }}
                        />
                    </div>
                    <div className="post-card__meta card-action">
                        <div className="post-card__meta__author">
                            <div className="post-card__meta__author-image">
                                <img className="circle" src={img} style={imgStyle} />
                            </div>
                            <div className="post-card__meta__info">
                                <Link
                                    to={get_profile_link(post.author.fullName, post.author.id)}
                                    title={post.author.fullName}
                                >
                                    <span className="post-card__meta__name">
                                        {post.author != null ? post.author.fullName : undefined}
                                    </span>
                                </Link>
                                <span className="post-card__meta__date">
                                    {format_date(post.timestamp)}
                                </span>
                            </div>
                        </div>
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
