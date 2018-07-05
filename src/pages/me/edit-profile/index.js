import React from 'react';
import types from 'prop-types';
import Router from 'next/router';
import { MainPage } from '../../../components/app';
import { isLoggedIn } from '../../../lib/helpers';
import PageBody from './view';
import './style.less';

const EditProfile = ({ loggedIn }) => {
    return <MainPage loggedIn={loggedIn} render={() => <PageBody />} />;
};

EditProfile.getInitialProps = async ({ res, isServer, req }) => {
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
            Router.push('/');
        }
    }

    return {};
};

EditProfile.propTypes = {
    loggedIn: types.bool.isRequired
};

export default EditProfile;
