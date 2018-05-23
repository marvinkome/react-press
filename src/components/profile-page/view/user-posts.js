import React, { Component } from 'react';
import types from 'prop-types';

import defImg from '../../../img/default-pic.png';
import { truncate, format_date } from '../../../js/helpers';

class UserPosts extends Component {
    render() {
        if ( this.props.data.posts.edges.length != 0 ) {
            this.props.data.posts.edges.sort((a, b) => {
                if (a.node.timestamp > b.node.timestamp) {
                    return -1;
                }
                if (a.node.timestamp < b.node.timestamp) {
                    return 1;
                }
                return 0;
            });
        }
        return (
            <div className="section user-posts">
                <div className="row">
                    <div className="col s12 m8">
                        <h5>Latest Posts by {this.props.data.fullName}</h5>

                        {this.props.data.posts.edges.map((obj) => (
                            <div className="card" key={obj.node.id}>
                                <div className="card-image">
                                    {obj.node.postPicUrl !== null && (
                                        <img src={obj.node.postPicUrl} className="responsive-img" />
                                    )}
                                </div>
                                <div className="card-content">
                                    <span className="card-title">{obj.node.title}</span>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: truncate(obj.node.body, 40)
                                        }}
                                    />
                                </div>
                                <div className="card-action">
                                    <div className="author">
                                        <div className="author-image">
                                            <img
                                                className="circle"
                                                src={this.props.data.gravatarUrl || defImg}
                                            />
                                        </div>
                                        <div className="info">
                                            <span className="name">{this.props.data.fullName}</span>
                                            <span className="date">
                                                {format_date(obj.node.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

UserPosts.propTypes = {
    data: types.object.isRequired
};

export default UserPosts;
