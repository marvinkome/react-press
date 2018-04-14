/**
 * ./src/components/post/view/author-info
 */

import React from 'react';
import PropTypes from 'prop-types';

const AuthorInfo = ({ data }) => (
    <div className="author-info">
        <div className="author-image col s3">
            <img src="./src/img/pp.jpg" className="responsive-img circle" />
        </div>
        <div className="author-details col s9">
            <p className="author-name">
                {data.fullName}
                <a title="follow" className="btn-small btn follow">
                    follow
                </a>
            </p>
            <p className="author-desc">
                Founder of CodeAnalogies (www.codeanalogies.com). Self-taught
                web developer. Passionate about not making same mistakes twice.
                Only new mistakes!
            </p>
            <p className="post-meta">Apr 10 2018 - 10 mins read</p>
        </div>
    </div>
);

AuthorInfo.propTypes = {
    data: PropTypes.object.isRequired
};
export default AuthorInfo;
