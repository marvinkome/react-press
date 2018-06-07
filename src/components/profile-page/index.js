/**
 * ./src/components/Post
 */

import React, { Component } from 'react';
import type from 'prop-types';

import View from './view';
import './style.less';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View user={this.props.match.params.username} />;
    }
}

ProfilePage.propTypes = {
    match: type.object.isRequired
};

export default ProfilePage;
