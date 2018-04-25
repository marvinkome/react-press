/**
 * ./src/components/post/view/body
 */

import React, { Component } from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';

import { clap } from '../../../js/redux/actions';
import Preloader from './preloader';
import PostCard from './post-card';
import AuthorInfo from './author-info';
import Comment from './comment';
import FAB from '../../helpers/fab';

const mapStateToProps = state => ({
    posts: state.post_data.posts,
    user: state.user_data,
    fetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
    clap: data => dispatch(clap(data))
});

class Body extends Component {
    constructor(props) {
        super(props);
        this.fabRef = React.createRef();
    }
    onClap = () => {
        const { posts, post_id } = this.props;

        let post = undefined;

        if (posts.length != 0) {
            post = posts.find(obj => obj.id == post_id);
        }

        if (this.props.user.data != undefined && post != undefined) {
            const data = {
                post_id: post.uuid,
                user_id: this.props.user.data.user.uuid
            };

            this.props.clap(data);
        }
    };
    render() {
        const { posts, post_id } = this.props;

        let post = undefined;

        if (posts.length != 0) {
            post = posts.find(obj => obj.id == post_id);
        }

        return (
            <div className="post-body section container">
                <div className="row">
                    {this.props.fetching ? (
                        <div className="col m12 center-align preloader-cont circle">
                            <Preloader />
                        </div>
                    ) : (
                        post != undefined && (
                            <div>
                                <div className="col m12">
                                    <AuthorInfo data={post} />

                                    <PostCard data={post} />

                                    <Comment data={post.comments} />
                                </div>
                                <FAB
                                    handleClap={this.onClap}
                                    claps_count={post.claps.edges.length}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

Body.propTypes = {
    post_id: types.string,
    user: types.object,
    posts: types.array.isRequired,
    fetching: types.bool.isRequired,
    clap: types.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
