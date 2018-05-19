/**
 * ./src/components/admin/new-post
 */

import React, { Component } from 'react';
import View from './view';
import { DEFAULT_TITLE } from '../../helpers/constants';
import './style/new-post.css';

class NewPost extends Component {
    componentDidMount(){
        document.title = 'New Post - ' + DEFAULT_TITLE;
    }
    render() {
        return <View />;
    }
}

export default NewPost;
