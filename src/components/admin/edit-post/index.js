/**
 * ./src/components/admin/edit-post
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from './view';
import { DEFAULT_TITLE } from '../../helpers/constants';

import './style/edit-post.css';

export const PostID = React.createContext();

class EditPost extends Component {
    componentDidMount() {
        document.title = 'Edit Post - ' + DEFAULT_TITLE;
    }
    render() {
        return (
            <PostID.Provider value={this.props.match.params.id}>
                <View />
            </PostID.Provider>
        );
    }
}

EditPost.propTypes = {
    match: PropTypes.object
};

export default EditPost;
