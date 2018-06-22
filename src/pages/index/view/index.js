import React from 'react';
import types from 'prop-types';
import PostCard from './post-card';
import { sort_posts } from '../../../lib/helpers';

export default class Body extends React.Component {
    render_post_cards = (posts) => {
        if (posts.length > 0) {
            return posts.map((obj) => (
                <div key={obj.node.id} className="col l6 m10 s12">
                    <PostCard post={obj.node} />
                </div>
            ));
        } else {
            return (
                <div className="col s12">
                    <h5 className="center">No posts</h5>
                </div>
            );
        }
    }
    render(){
        const posts = sort_posts(this.props.posts);

        return (
            <div className="body section container">
                <div className="row">
                    {this.render_post_cards(posts)}
                </div>
            </div>
        );
    }
}

Body.propTypes = {
    posts: types.array
};
