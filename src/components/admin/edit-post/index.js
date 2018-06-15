/**
 * ./src/components/admin/edit-post
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from '../shared/editorComponent';
import { DEFAULT_TITLE } from '../../helpers/constants';

class EditPost extends Component {
    componentDidMount() {
        document.title = 'Edit Post - ' + DEFAULT_TITLE;
    }
    render() {
        return <View id={this.props.match.params.id} />;
    }
}

EditPost.propTypes = {
    match: PropTypes.object
};

export default EditPost;
