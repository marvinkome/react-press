import React from 'react';
import types from 'prop-types';

const AuthorInfo = ({ data: { user } }) => {
    const user_img = user && user.gravatarUrl || '/static/default-pic.png';
    const img_class = user && user.description === null ? ' no-desc' : '';

    return (
        <div className="author-box">
            <div className="author-info">
                <div className={'author-image col s3' + img_class}>
                    <img src={user_img} className="responsive-img circle" />
                </div>
                <div className="author-details col s9">
                    <p className="author-name">{user && user.fullName}</p>
                    <p className="author-desc">{user && user.description}</p>
                    <p className="post-meta"> *markdown is supported </p>
                </div>
            </div>
        </div>
    );
};

AuthorInfo.propTypes = {
    data: types.object
};

export default AuthorInfo;
