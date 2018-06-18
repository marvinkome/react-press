/**
 * ./src/components/home/view/post-card
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { format_date, get_profile_link } from '../../../js/helpers';

export const PostCard = ({ post }) => {
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
            : '/static/default-pic.png';

    const cardImgStyle = {
        backgroundImage: 'url(\'' + post.postPicUrl + '\')',
        backgroundColor: '#454545'
    };

    return (
        <div>
            <div className="post-card card horizontal">
                {post.postPicUrl != undefined &&
                    post.postPicUrl != '' && (
                    <div className="post-card__image card-image" style={cardImgStyle} />
                )}
                <div className="card-stacked">
                    <div className="card-content">
                        <h1 className="post-card__title">
                            <Link href={'/post/' + post.id}>
                                <a className="post-card__title--link">
                                    {post.title}
                                </a>
                            </Link>
                        </h1>
                        <p
                            className="post-card__text"
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
                                <Link href={get_profile_link(post.author.fullName, post.author.id)}>
                                    <a title={post.author.fullName}>
                                        <span className="post-card__meta__name">
                                            {post.author != null ? post.author.fullName : undefined}
                                        </span>
                                    </a>
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
