/**
 * ./src/components/home
 */

import React, { Component } from 'react';
import View from './view';
import './style/dashboard.css';

import { DEFAULT_TITLE } from '../../helpers/constants';

class Dashboard extends Component {
    componentDidMount() {
        document.title = 'Dashboard - ' + DEFAULT_TITLE;
    }
    render() {
        return <View />;
    }
}

export default Dashboard;
