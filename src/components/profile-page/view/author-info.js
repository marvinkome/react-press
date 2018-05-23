import React, { Component } from 'react';
import types from 'prop-types';

import defImg from '../../../img/default-pic.png';
import { format_date } from '../../../js/helpers';

class AuthorInfo extends Component {
    render() {
        return (
            <div className="section author-info">
                <div className="row">
                    <div className="col s12 m8 author-desc">
                        <h3>{this.props.data.fullName}</h3>
                        {this.props.data.description !== null && (
                            <p>{this.props.data.description}</p>
                        )}
                        <div className="author-meta-info">
                            <span>Joined: {format_date(this.props.data.memberSince)}</span>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="author-image">
                            <img
                                src={this.props.data.gravatarUrl || defImg}
                                className="responsive-img circle"
                            />
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
