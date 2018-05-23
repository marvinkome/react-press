/**
 * ./src/components/profile-page/view
 */

import React, { Component } from 'react';
import types from 'prop-types';
import { connect } from 'react-redux';

import TopBar from '../../helpers/topbar';
import Body from './body';

const mapStateToProps = (state) => ({
    user_data: state.user_data
});

class View extends Component {
    render() {
        const { user_data, user } = this.props;
        return (
            <div>
                <TopBar user_data={user_data.data} />
                <Body user={user}/>
            </div>
        );
    }
}

View.propTypes = {
    user_data: types.object.isRequired,
    user: types.string.isRequired
};

export default connect(mapStateToProps)(View);