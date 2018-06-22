/**
 * ./src/components/admin/new-post/view/body
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TopBar from '../../../helpers/topbar';
import PostEditor from './postEditor';
import { create_posts, create_tags, edit_post } from '../../../../js/redux/actions';
import { createToast } from '../../../../js/helpers';
import history from '../../../../js/history';

export const { Provider, Consumer } = React.createContext();

export class Body extends Component {
    publishPost = async (data, tags, editPage = false) => {
        if (editPage) {
            try {
                const post_data = await this.props.edit_post(data);

                tags.map((tagObj) =>
                    this.props.create_tag({
                        tag_name: tagObj.tag,
                        post_id: post_data.post_id
                    })
                );

                createToast('Post has been edited');
                history.push('/admin/posts');
            } catch (e) {
                createToast('Error can\'t save post');
                return false;
            }
        } else {
            try {
                const post_data = await this.props.create_post(data);

                tags.map((tagObj) =>
                    this.props.create_tag({
                        tag_name: tagObj.tag,
                        post_id: post_data.post.data.createPost.post.uuid
                    })
                );

                createToast('Post has been created');

                history.push('/admin/posts');
                return true;
            } catch (e) {
                createToast('Error creating post');
                return false;
            }
        }
    };
    render() {
        const data = this.props.data.data;
        return (
            <React.Fragment>
                <TopBar user_data={data} />
                <Provider value={this.publishPost}>
                    <PostEditor user_data={data} post_id={this.props.post_id} />
                </Provider>
            </React.Fragment>
        );
    }
}

Body.propTypes = {
    post_id: PropTypes.string,
    data: PropTypes.object.isRequired,
    create_post: PropTypes.func.isRequired,
    create_tag: PropTypes.func.isRequired,
    edit_post: PropTypes.func
};

const mapDispatchToProp = (dispatch) => ({
    edit_post: (data) => dispatch(edit_post(data)),
    create_post: (data) => dispatch(create_posts(data)),
    create_tag: (data) => dispatch(create_tags(data))
});

const mapStateToProps = (state) => ({
    data: state.user_data
});

export default connect(mapStateToProps, mapDispatchToProp)(Body);
