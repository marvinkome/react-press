/**
 * ./src/components/home/view
 */

import React, { Component } from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';

import TopBar from '../../helpers/topbar';
import Body from './body';

const mapStateToProps = (state) => ({
    user_data: state.user_data
});

export class View extends Component {
    render() {
        const { user_data } = this.props;
        return (
            <div>
                <TopBar user_data={user_data.data} />
                <Body />
            </div>
        );
    }
}

View.propTypes = {
    user_data: types.object.isRequired
};

export default connect(mapStateToProps)(View);
