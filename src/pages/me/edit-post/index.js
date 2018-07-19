import React from 'react';
import types from 'prop-types';
import { Query } from 'react-apollo';

import MainPage from '../../../components/app';
import Error from '../../../components/error';
import PageView from '../../../components/editorComponent';

import redirect from '../../../lib/redirect';
import { checkLoggedIn } from '../../../lib/helpers';

import query from './query';

export const EditPost = ({ loggedIn, post_name }) => {
    return (
        <MainPage
            loggedIn={loggedIn}
            pageTitle="Edit Post"
            render={() => (
                <Query query={query} variables={{ post_name }}>
                    {({ data, error }) => {
                        if (error) return <Error render={<p>Error fetching post data</p>} />;

                        return <PageView post={data} />;
                    }}
                </Query>
            )}
        />
    );
};

EditPost.getInitialProps = async (ctx) => {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

    if (!loggedInUser.user) {
        redirect(ctx, '/');
        return {};
    }

    const post_name = decodeURIComponent(ctx.query.id);
    return { post_name };
};

EditPost.propTypes = {
    loggedIn: types.bool.isRequired,
    post_name: types.string.isRequired
};

export default EditPost;
