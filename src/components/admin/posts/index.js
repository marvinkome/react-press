/**
 * ./src/components/admin/posts
 */

import React, { Component } from 'react';
import View from './view';
import { DEFAULT_TITLE } from '../../helpers/constants';
import './style/posts.css';

class Post extends Component {
    componentDidMount() {
        document.title = 'All Post - ' + DEFAULT_TITLE;
    }
    render() {
        return <View />;
    }
}

export default Post;
