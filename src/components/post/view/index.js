/**
 * ./src/components/home/view
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PostID } from '../index';
import TopBar from '../../helpers/topbar';

import Body from './body';

class InnerView extends Component {
    render() {
        const { value } = this.props;
        const user_data = value.user_data;
        return (
            <div>
                <TopBar user_data={user_data.data} />
                <Body />
            </div>
        );
    }
}

const View = props => (
    <PostID.Consumer>
        {value => <InnerView {...props} value={value} />}
    </PostID.Consumer>
);

InnerView.propTypes = {
    value: PropTypes.object.isRequired
};

export default View;
