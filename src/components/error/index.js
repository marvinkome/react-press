import React from 'react';
import types from 'prop-types';
import './style.less';

export class Error extends React.Component {
    render() {
        let fullScreen = this.props.fullScreen ? 'fullscreen' : '';

        return <div className={`error container ${fullScreen}`}>{this.props.render}</div>;
    }
}

Error.propTypes = {
    render: types.any,
    fullScreen: types.bool
};

export default Error;
