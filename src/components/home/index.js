/**
 * ./src/components/home
 */

import React, { Component } from 'react';
import View from './view';
import { DEFAULT_TITLE } from '../helpers/constants';
import './style/home.css';

class Home extends Component {
    componentDidMount() {
        document.title = 'HomePage - ' + DEFAULT_TITLE;
    }
    render() {
        return <View />;
    }
}

export default Home;
