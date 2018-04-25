/**
 * ./src/components/Post
 */

import React, { Component } from 'react';
import type from 'prop-types';

import View from './view';

class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View id={this.props.match.params.id} />;
    }
}

Post.propTypes = {
    match: type.object.isRequired
};

export default Post;
