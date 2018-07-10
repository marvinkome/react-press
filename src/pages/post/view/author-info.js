import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { format_date, get_profile_link } from '../../../lib/helpers';

const AuthorInfo = ({ data }) => {
    const userHasImage = data.author.gravatarUrl !== null && data.author.gravatarUrl !== '';

    const imgStyle = userHasImage ? {
        borderRadius: '50%',
        backgroundColor: '#fafafa'
    } : {};

    const img = userHasImage ? data.author.gravatarUrl : '/static/default-pic.png';
    
    const authProfileLink = get_profile_link(data.author.fullName, data.author.id);

    return (
        <div className="author-info">
            <div className="author-image col s3">
                <img
                    src={img}
                    className="responsive-img circle"
                    style={imgStyle}
                    title={data.author.fullName}
                />
            </div>
            <div className="author-details col s9">
                <Link href={authProfileLink}>
                    <a title="View Profile">
                        <p className="author-name">{data.author.fullName}</p>
                    </a>
                </Link>
                <p className="author-desc">{data.author.description}</p>
                <p className="post-meta">{format_date(data.timestamp)}</p>
            </div>
        </div>
    );
};

AuthorInfo.propTypes = {
    data: PropTypes.object.isRequired
};
export default AuthorInfo;
