/**
 * ./src/components/admin/edit-profile
 */

import React, { Component } from 'react';
import View from './view';
import { DEFAULT_TITLE } from '../../helpers/constants';
import './style/edit-profile.css';

class EditProfile extends Component {
    componentDidMount() {
        document.title = 'Edit Profile - ' + DEFAULT_TITLE;
    }
    render() {
        return <View />;
    }
}

export default EditProfile;
