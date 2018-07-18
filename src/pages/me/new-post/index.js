import React from 'react';
import types from 'prop-types';

import MainPage from '../../../components/app';
import PageView from '../../../components/editorComponent';

import redirect from '../../../lib/redirect';
import { checkLoggedIn } from '../../../lib/helpers';

export const NewPost = ({ loggedIn }) => {
    return <MainPage loggedIn={loggedIn} pageTitle="Create new post" render={() => <PageView />} />;
};

NewPost.getInitialProps = async (ctx) => {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

    if (!loggedInUser.user) {
        redirect(ctx, '/');
    }

    return {};
};

NewPost.propTypes = {
    loggedIn: types.bool.isRequired
};

export default NewPost;
