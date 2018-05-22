/**
 * ./src/components/post/view/author-info
 */

import React from 'react';
import PropTypes from 'prop-types';
import { format_date } from '../../../js/helpers';
import defImg from '../../../img/default-pic.png';

const AuthorInfo = ({ data }) => {
    const imgStyle =
        data.author.gravatarUrl != null &&
        data.author.gravatarUrl != ''
            ? {
                borderRadius: '50%',
                backgroundColor: '#fafafa'
            }
            : {};
    const img =
        data.author.gravatarUrl != undefined &&
        data.author.gravatarUrl != ''
            ? data.author.gravatarUrl
            : defImg;

    return (
        <div className="author-info">
            <div className="author-image col s3">
                <img
                    src={img}
                    className="responsive-img circle"
                    style={imgStyle}
                />
            </div>
            <div className="author-details col s9">
                <p className="author-name">{data.author.fullName}</p>
                <p className="author-desc">
                    {data.author.description}
                </p>
                <p className="post-meta">
                    {format_date(data.timestamp)}
                </p>
            </div>
        </div>
    );
};

AuthorInfo.propTypes = {
    data: PropTypes.object.isRequired
};
export default AuthorInfo;
