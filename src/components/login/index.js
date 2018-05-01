/**
 * ./src/components/home
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from './view';
import './style/auth.css';

class Login extends Component {
    render() {
        return (
            <View
                section={this.props.match.params.section}
                history={this.props.history}
            />
        );
    }
}

Login.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default Login;
