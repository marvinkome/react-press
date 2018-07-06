import React from 'react';
import types from 'prop-types';
import Router from 'next/router';
import { MainPage } from '../../../components/app';
import PageView from '../../../components/editorComponent';
import { isLoggedIn } from '../../../lib/helpers';

export const NewPost = ({ loggedIn }) => {
    return <MainPage loggedIn={loggedIn} pageTitle="Create new post" render={() => <PageView />} />;
};

NewPost.getInitialProps = async ({ res, isServer, req }) => {
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

NewPost.propTypes = {
    loggedIn: types.bool.isRequired
};

export default NewPost;
