/**
 * ./src/components/post/view/body
 */

import React, { Component } from 'react';

import { PostID } from '../index';
import PostCard from './post-card';
import AuthorInfo from './author-info';
import Comment from './comment';
import Preloader from './preloader';

class Body extends Component {
    constructor(props) {
        super(props);
        this.fabRef = React.createRef();
    }
    componentDidMount() {
        const fab = this.fabRef.current;
        window.M.FloatingActionButton.init(fab);
    }
    render() {
        return (
            <PostID.Consumer>
                {value => {
                    const post = value.data.find(obj => obj.id == value.id);
                    return (
                        <div className="post-body section container">
                            <div className="row">
                                {value.isFetching ? (
                                    <div className="col m12 center-align preloader-cont circle">
                                        <Preloader />
                                    </div>
                                ) : (
                                    post && (
                                        <div className="col m12">
                                            <AuthorInfo data={post} />

                                            <PostCard data={post} />

                                            <Comment data={post.comments} />
                                        </div>
                                    )
                                )}
                            </div>
                            <div ref={this.fabRef} className="fixed-action-btn">
                                <a className="btn-floating btn-large">
                                    <i className="fa fa-thumbs-up" />
                                </a>
                                <ul>
                                    <li>
                                        <a className="btn-floating btn-num">
                                            12
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    );
                }}
            </PostID.Consumer>
        );
    }
}

export default Body;
