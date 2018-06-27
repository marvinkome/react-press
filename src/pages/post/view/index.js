import React from 'react';
import { connect } from 'react-redux';
import types from 'prop-types';
import PostBody from './body';
import { clap, addComment, replyComment, viewPage } from '../../../store/actions';
import { createToast } from '../../../lib/helpers';

export class PageBody extends React.Component {
    handleClap = async () => {
        if (this.props.loggedIn === true) {
            const { data } = this.props.user_data;
            if (data !== undefined && data !== null) {
                const post_id = this.props.post.node.uuid;
                const user_id = data.user.uuid;
                const clap_data = {
                    post_id,
                    user_id
                };

                try {
                    await this.props.clap(clap_data);
                } catch (e) {
                    createToast('There was an error, please try again');
                }
            }
        } else {
            createToast('Sign up or Login to appreciate this post');
        }
    };
    render() {
        return <PostBody post={this.props.post} onClap={this.handleClap} />;
    }
}

PageBody.propTypes = {
    post: types.object.isRequired,
    loggedIn: types.bool.isRequired,
    user_data: types.object.isRequired,
    clap: types.func.isRequired
};

const mapStateToProps = (state) => ({
    user_data: state.user_data
});

const mapDispatchToProps = (dispatch) => ({
    clap: (data) => dispatch(clap(data)),
    comment: (data) => dispatch(addComment(data)),
    reply_comment: (data) => dispatch(replyComment(data)),
    page_viewed: (data) => dispatch(viewPage(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageBody);
