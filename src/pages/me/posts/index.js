import React from 'react';
import types from 'prop-types';

import { checkLoggedIn } from '../../../lib/helpers';
import redirect from '../../../lib/redirect';

import MainPage from '../../../components/app';
import PageBody from './view';

import './style.less';

const AdminPosts = ({ loggedIn }) => {
    return <MainPage loggedIn={loggedIn} pageTitle="Your posts" render={() => <PageBody />} />;
};

AdminPosts.getInitialProps = async (ctx) => {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

    if (!loggedInUser.user) {
        redirect(ctx, '/');
    }

    return {};
};

AdminPosts.propTypes = {
    loggedIn: types.bool.isRequired
};

export default AdminPosts;
