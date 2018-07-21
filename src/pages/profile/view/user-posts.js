import React, { Component } from 'react';
import types from 'prop-types';
import Link from 'next/link';
import Error from '../../../components/error';
import { truncate, strip_html, format_date, get_page_link } from '../../../lib/helpers';

class UserPosts extends Component {
    renderPosts = (obj) => {
        const defImg = '/static/default-pic.png';
        const noPostPic = obj.node.postPicUrl !== null && obj.node.postPicUrl !== '';
        const pageLink = get_page_link(obj.node.title, obj.node.id);

        return (
            <div className="card" key={obj.node.id}>
                <div className="card-content">
                    {noPostPic && (
                        <div className="card-image">
                            <img src={obj.node.postPicUrl} className="responsive-img" />
                        </div>
                    )}

                    <Link href={`/p/${pageLink}`}>
                        <a>
                            <span className="card-title">{obj.node.title}</span>
                        </a>
                    </Link>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: truncate(strip_html(obj.node.body), 40)
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
    };
    render() {
        const posts = this.props.data.posts.edges;
        return (
            <div className="section user-posts">
                <div className="row">
                    <div className="col s12 m12">
                        <h5>Latest Posts by {this.props.data.fullName}</h5>

                        {!posts.length ? (
                            <Error
                                render={
                                    <div>
                                        <h5 className="center">
                                            No Posts by {this.props.data.fullName}
                                        </h5>
                                    </div>
                                }
                            />
                        ) : (
                            posts.map((obj) => this.renderPosts(obj))
                        )}
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
