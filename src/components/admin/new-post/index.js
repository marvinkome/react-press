/**
 * ./src/components/admin/new-post
 */

import React, { Component } from 'react';
import View from '../shared/editorComponent';
import { DEFAULT_TITLE } from '../../helpers/constants';

class NewPost extends Component {
    componentDidMount() {
        document.title = 'New Post - ' + DEFAULT_TITLE;
    }
    render() {
        return <View />;
    }
}

export default NewPost;
