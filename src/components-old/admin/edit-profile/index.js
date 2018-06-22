/**
 * ./src/components/admin/edit-profile
 */

import React, { Component } from 'react';
import View from './view';
import { setPageTitle } from '../../../js/helpers';
import './style.less';

class EditProfile extends Component {
    componentDidMount() {
        setPageTitle('Edit Profile');
    }
    render() {
        return <View />;
    }
}

export default EditProfile;
