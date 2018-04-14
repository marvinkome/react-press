/**
 * ./src/components/post/view/body
 */

import React, { Component } from 'react';

import { PostID } from '../index';
import PostCard from './post-card';
import AuthorInfo from './author-info';
import Comment from './comment';

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
        // const post_id = this.props.match.params.id;
        // const post = this.props.posts.find();
        return (
            <PostID.Consumer>
                {value => {
                    return (
                        <div className="post-body section container">
                            <div className="row">
                                <div className="col m12">
                                    <AuthorInfo data={value.author} />

                                    <PostCard data={value} />

                                    <Comment />
                                </div>
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
