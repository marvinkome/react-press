import React from 'react';
import types from 'prop-types';
import PostCard from './post-card';
import { sort_posts } from '../../../lib/helpers';

export class Body extends React.Component {
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
    onScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            this.props.fetch_more();
        }
    };

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
                    <h5 className="center">They{'\''}re currently no post available.</h5>
                </div>
            );
        }
    };
    render() {
        const posts = sort_posts(this.props.posts);

        return (
            <div className="body section container">
                <div className="row">{this.render_post_cards(posts)}</div>
            </div>
        );
    }
}

Body.propTypes = {
    posts: types.array.isRequired,
    fetch_more: types.func.isRequired
};

export default Body;
