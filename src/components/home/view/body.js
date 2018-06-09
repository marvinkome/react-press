/**
 * ./src/components/home/view/body
 */

import React, { Component } from 'react';
import type from 'prop-types';

import { connect } from 'react-redux';
import { fetch_more_data } from '../../../js/redux/actions';

import PostCard from './post-card';
import Preloader from '../../helpers/preloader';
import { sort_posts } from '../../../js/helpers';

export class Body extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
    onScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight &&
            (this.props.posts.length > 0 && this.props.cursor != '' && this.props.hasMore)
        ) {
            this.props.fetch_more(this.props.cursor);
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
                    <h5 className="center">No posts</h5>
                </div>
            );
        }
    };
    render() {
        const posts = sort_posts(this.props.posts);

        return (
            <div className="body section container">
                <div className="row">
                    {this.props.fetching ? (
                        <div className="col s12">
                            <Preloader />
                        </div>
                    ) : (
                        this.render_post_cards(posts)
                    )}
                </div>
            </div>
        );
    }
}

Body.propTypes = {
    fetching: type.bool.isRequired,
    posts: type.array.isRequired,
    cursor: type.string,
    hasMore: type.bool,
    fetch_more: type.func
};

const mapStateToProps = (state) => ({
    fetching: state.isFetching,
    posts: state.post_data.posts,
    cursor: state.cursor,
    hasMore: state.hasNextPage
});

const mapDispatchToProps = (dispatch) => ({
    fetch_more: (cursor) => dispatch(fetch_more_data(cursor))
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
