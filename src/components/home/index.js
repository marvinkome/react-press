/**
 * ./src/components/home
 */

import React, { Component } from 'react';
import View from './view';
import './style/home.css';

class Home extends Component {
    componentDidMount(){
        document.title = document.title + ' - HomePage';
    }
    render() {
        return <View />;
    }
}

export default Home;
