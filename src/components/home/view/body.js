/**
 * ./src/components/home/view/body
 */

import React, { Component } from 'react';
import type from 'prop-types';

import { connect } from 'react-redux';
import { fetch_more_data } from '../../../js/redux/actions';

import PostCard from './post-card';
import Preloader from '../../helpers/preloader';

const mapStateToProps = (state) => ({
    fetching: state.isFetching,
    posts: state.post_data.posts,
    cursor: state.cursor,
    hasMore: state.hasNextPage
});

const mapDispatchToProps = (dispatch) => ({
    fetch_more: (cursor) => dispatch(fetch_more_data(cursor))
});

class Body extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
    onScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
                document.body.offsetHeight &&
            (this.props.posts.length > 0 &&
                this.props.cursor != '' &&
                this.props.hasMore)
        ) {
            this.props.fetch_more(this.props.cursor);
        }
    };
    fetch_more = (e) => {
        e.preventDefault();
        if (this.props.hasMore) {
            this.props.fetch_more(this.props.cursor);
        } else {
            alert('No more posts to fetch');
        }
    };
    render() {
        if (this.props.posts != undefined) {
            this.props.posts.sort((a, b) => {
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
            <div className="body section container">
                <div className="row">
                    {this.props.fetching ? (
                        <div className="col s12">
                            <Preloader />
                        </div>
                    ) : this.props.posts.length > 0 ? (
                        <div>
                            {this.props.posts.map((obj) => (
                                <div
                                    key={obj.node.id}
                                    className="col l4 m6 s12"
                                >
                                    <PostCard post={obj.node} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="col s12">
                            <h5 className="center">No posts</h5>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Body);
