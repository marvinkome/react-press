/**
 * ./src/components/app/admin
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Sidenav from './helpers/sidenav';
import Dashboard from './dashboard';
import Posts from './posts';
import NewPost from './new-post';
import EditProfile from './edit-profile';
import { Err404 } from '../helpers/errors';

import _EditPost from './edit-post';
export const EditPost = _EditPost;

export default class Admin extends Component {
    handlePath = path => {
        switch (path) {
        case 'dashboard':
            return <Dashboard />;
        case 'posts':
            return <Posts />;
        case 'new-post':
            return <NewPost />;
        case 'edit-profile':
            return <EditProfile />;
        default:
            return <Err404 />;
        }
    };
    render() {
        const path = this.props.match.params.path;

        return (
            <div>
                <Sidenav />
                {this.handlePath(path)}
            </div>
        );
    }
}

Admin.propTypes = {
    match: PropTypes.object.isRequired
};
