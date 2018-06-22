import React, { Component } from 'react';
import types from 'prop-types';
import { Link } from 'react-router-dom';

import defImg from '../../../img/default-pic.png';
import { truncate, format_date, sort_posts } from '../../../js/helpers';

class UserPosts extends Component {
    renderPosts = (obj) => (
        <div className="card" key={obj.node.id}>
            <div className="card-content">
                {obj.node.postPicUrl !== null &&
                    obj.node.postPicUrl !== '' && (
                    <div className="card-image">
                        <img src={obj.node.postPicUrl} className="responsive-img" />
                    </div>
                )}
                <Link to={'/post/' + obj.node.id}>
                    <span className="card-title">{obj.node.title}</span>
                </Link>
                <p
                    dangerouslySetInnerHTML={{
                        __html: truncate(obj.node.body, 40)
                    }}
                />
            </div>
            <div className="card-action">
                <div className="author">
                    <div className="author-image">
                        <img className="circle" src={this.props.data.gravatarUrl || defImg} />
                    </div>
                    <div className="info">
                        <span className="name">{this.props.data.fullName}</span>
                        <span className="date">{format_date(obj.node.timestamp)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
    renderNoPostErr = () => (
        <div>
            <h5 className="center">No Posts by {this.props.data.fullName}</h5>
        </div>
    );
    render() {
        const posts = sort_posts(this.props.data.posts.edges);

        return (
            <div className="section user-posts">
                <div className="row">
                    <div className="col s12 m12">
                        <h5>Latest Posts by {this.props.data.fullName}</h5>

                        {posts.length > 0
                            ? posts.map((obj) => this.renderPosts(obj))
                            : this.renderNoPostErr()}
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
