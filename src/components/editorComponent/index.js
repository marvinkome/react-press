import React, { Component } from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';

import PostEditor from './postEditor';
import { create_posts, create_tags, edit_post } from '../../store/actions';
import { createToast } from '../../lib/helpers';
import './style.less';

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
                return true;
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
            <Provider value={this.publishPost}>
                <PostEditor user_data={data} post_id={this.props.post_id} />
            </Provider>
        );
    }
}

Body.propTypes = {
    post_id: types.string,
    data: types.object.isRequired,
    create_post: types.func.isRequired,
    create_tag: types.func.isRequired,
    edit_post: types.func
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
