import React from 'react';
import types from 'prop-types';
import { Query, Mutation, withApollo } from 'react-apollo';

import MainPage from '../../../components/app';

import redirect from '../../../lib/redirect';
import { checkLoggedIn, createToast } from '../../../lib/helpers';

import PageBody from './view';
import query, { updateProfile } from './query';
import './style.less';

const EditProfile = ({ loggedIn, client }) => {
    const handleNewProfile = (user_data, updateFunc) => {
        updateFunc({ variables: user_data });
    };
    const onError = () => createToast('Error updating your profile');
    const onCompleted = async () => {
        await client.resetStore();
        await createToast('Your profile has been updated');
    };

    return (
        <MainPage
            loggedIn={loggedIn}
            pageTitle="Edit Profile"
            render={() => (
                <Query query={query}>
                    {({ data }) => {
                        const user_data = data.user;

                        return (
                            <Mutation
                                mutation={updateProfile}
                                onCompleted={onCompleted}
                                onError={onError}
                            >
                                {(update_profile) => {
                                    return (
                                        <PageBody
                                            data={user_data}
                                            handleNewProfile={(user_data) =>
                                                handleNewProfile(user_data, update_profile)
                                            }
                                        />
                                    );
                                }}
                            </Mutation>
                        );
                    }}
                </Query>
            )}
        />
    );
};

EditProfile.getInitialProps = async (ctx) => {
    const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

    if (!loggedInUser.user) {
        redirect(ctx, '/');
    }

    return {};
};

EditProfile.propTypes = {
    loggedIn: types.bool.isRequired,
    client: types.object.isRequired
};

export default withApollo(EditProfile);
