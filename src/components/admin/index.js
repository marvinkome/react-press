/**
 * ./src/components/app/admin
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import Sidenav from './helpers/sidenav';
import { Err404 } from '../helpers/errors';
import { AppLoading } from '../helpers/preloader';

import _EditPost from './edit-post';
export const EditPost = _EditPost;

const Loader = (props) => <AppLoading {...props} admin/>;

const AsyncDashboard = Loadable({
    loader: () => import('./dashboard'),
    loading: Loader,
    timeout: 10000,
    delay: 300
});

const AsyncPosts = Loadable({
    loader: () => import('./posts'),
    loading: Loader,
    timeout: 10000,
    delay: 300
});

const AsyncNewPost = Loadable({
    loader: () => import('./new-post'),
    loading: Loader,
    timeout: 10000,
    delay: 300
});

const AsyncEditProfile = Loadable({
    loader: () => import('./edit-profile'),
    loading: Loader,
    timeout: 10000,
    delay: 300
});

export default class Admin extends Component {
    handlePath = (path) => {
        switch (path) {
        case 'dashboard':
            return <AsyncDashboard />;
        case 'posts':
            return <AsyncPosts />;
        case 'new-post':
            return <AsyncNewPost />;
        case 'edit-profile':
            return <AsyncEditProfile />;
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
