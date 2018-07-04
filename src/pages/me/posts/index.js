import React from 'react';
import types from 'prop-types';
import Router from 'next/router';
import { MainPage } from '../../../components/app';
import PageBody from './view';
import { createToast, isLoggedIn } from '../../../lib/helpers';
import './style.less';

const AdminPosts = ({ loggedIn }) => {
    return <MainPage loggedIn={loggedIn} render={() => <PageBody />} />;
};

AdminPosts.getInitialProps = async ({ res, isServer, req }) => {
    if (isServer) {
        if (isLoggedIn(req) === false) {
            const backURL = '/login';
            res.writeHead(302, {
                Location: backURL
            });
            res.end();
            res.finished = true;
        }
    } else {
        if (isLoggedIn() === false) {
            Router.back();
            createToast('You\'re already logged in');
        }
    }

    return {};
};

AdminPosts.propTypes = {
    loggedIn: types.bool.isRequired
};

export default AdminPosts;
