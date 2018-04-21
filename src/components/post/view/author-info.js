/**
 * ./src/components/post/view/author-info
 */

import React from 'react';
import PropTypes from 'prop-types';
import { format_date } from '../../../js/helpers';

const AuthorInfo = ({ data }) => (
    <div className="author-info">
        <div className="author-image col s3">
            <img
                src={data.author.gravatarUrl}
                className="responsive-img circle"
            />
        </div>
        <div className="author-details col s9">
            <p className="author-name">
                {data.author.fullName}
                <a title="follow" className="btn-small btn follow">
                    follow
                </a>
            </p>
            <p className="author-desc">{data.author.description}</p>
            <p className="post-meta">{format_date(data.timestamp)}</p>
        </div>
    </div>
);

AuthorInfo.propTypes = {
    data: PropTypes.object.isRequired
};
export default AuthorInfo;
