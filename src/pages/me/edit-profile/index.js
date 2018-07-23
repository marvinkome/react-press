import React from 'react';
import types from 'prop-types';
import { Query, Mutation, withApollo } from 'react-apollo';

import MainPage from '../../../components/app';

import redirect from '../../../lib/redirect';
import { checkLoggedIn, createToast } from '../../../lib/helpers';

import PageBody from './view';
import query, { updateProfile, updateProfilePic } from './query';
import './style.less';

const EditProfile = ({ loggedIn, client }) => {
    const handleNewProfile = (user_data, updateFunc) => {
        updateFunc({ variables: user_data });
    };

    const handleNewProfilePic = (data, updateFunc) => {
        updateFunc({ variables: data });
    };

    const onError = (pic) => createToast(`Error updating your profile ${pic ? 'picture' : ''}`);

    const onCompleted = async (pic) => {
        await client.resetStore();
        await createToast(`Your profile ${pic ? 'picture' : ''} has been updated`);
    };

    const pageBody = (user_data, update_data, update_pic) => {
        return (
            <PageBody
                data={user_data}
                handleNewProfile={(user_data) => handleNewProfile(user_data, update_data)}
                handleNewProfilePic={(pic_data) => handleNewProfilePic(pic_data, update_pic)}
            />
        );
    };

    return (
        <MainPage
            loggedIn={loggedIn}
            pageTitle="Edit Profile"
            render={() => (
                <Query query={query}>
                    {(renderProp) => {
                        const { data } = renderProp;
                        const user_data = data.user;

                        return (
                            <Mutation
                                mutation={updateProfile}
                                onCompleted={onCompleted}
                                onError={onError}
                            >
                                {(update_profile) => {
                                    return (
                                        <Mutation
                                            mutation={updateProfilePic}
                                            onCompleted={() => onCompleted(true)}
                                            onError={() => onError(true)}
                                        >
                                            {(update_pic) =>
                                                pageBody(user_data, update_profile, update_pic)
                                            }
                                        </Mutation>
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
