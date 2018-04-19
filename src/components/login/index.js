/**
 * ./src/components/home
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from './view';

class Login extends Component {
    render() {
        return <View section={this.props.match.params.section} />;
    }
}

Login.propTypes = {
    match: PropTypes.object
};

export default Login;
