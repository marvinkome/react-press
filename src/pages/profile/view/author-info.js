import React, { Component } from 'react';
import types from 'prop-types';

import { format_date } from '../../../lib/helpers';

class AuthorInfo extends Component {
    render() {
        const defImg = '/static/default-pic.png';

        return (
            <div className="section author-info">
                <div className="row">
                    <div className="col s12 m4 push-m8">
                        <div className="author-image">
                            <img
                                src={this.props.data.gravatarUrl || defImg}
                                className="responsive-img"
                            />
                        </div>
                    </div>
                    <div className="col s12 m8 pull-m4 author-desc">
                        <h1>{this.props.data.fullName}</h1>
                        {this.props.data.description !== null && (
                            <p>{this.props.data.description}</p>
                        )}
                        <div className="author-meta-info">
                            <span>Joined: {format_date(this.props.data.memberSince)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AuthorInfo.propTypes = {
    data: types.object.isRequired
};

export default AuthorInfo;
