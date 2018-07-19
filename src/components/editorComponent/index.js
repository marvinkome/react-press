import React from 'react';
import types from 'prop-types';
import { Query, Mutation, withApollo } from 'react-apollo';

import redirect from '../../lib/redirect';
import { createToast } from '../../lib/helpers';
import PostEditor from './postEditor';
import query, { createPostMutation, editPostMutation } from './query';
import './style.less';

export const { Provider, Consumer } = React.createContext();

export const Body = ({ post, client }) => {
    const onCompleted = async () => {
        
        await client.resetStore();
        await redirect({}, '/me/posts');
    };

    const onError = () => createToast('Error creating post, try again');

    const createPost = (post_data, create_post) => {
        let { title, body, postPicUrl, topic: tag } = post_data;

        if (postPicUrl === '') postPicUrl = null;
        if (tag === '') tag = null;

        create_post({ variables: { title, body, postPicUrl, tag } });
    };

    const editPost = (post_data, edit_post) => {
        edit_post({ variables: post_data });
    };

    return (
        <Query query={query}>
            {({ data }) => {
                return (
                    <Mutation
                        mutation={createPostMutation}
                        onCompleted={onCompleted}
                        onError={onError}
                    >
                        {(create_post) => {
                            return (
                                <Mutation
                                    mutation={editPostMutation}
                                    onCompleted={onCompleted}
                                    onError={onError}
                                >
                                    {(edit_post) => {
                                        return (
                                            <Provider
                                                value={(data, editPage) => {
                                                    if (editPage) {
                                                        editPost(data, edit_post);
                                                    } else {
                                                        createPost(data, create_post);
                                                    }
                                                }}
                                            >
                                                <PostEditor user_data={data} post_data={post} />
                                            </Provider>
                                        );
                                    }}
                                </Mutation>
                            );
                        }}
                    </Mutation>
                );
            }}
        </Query>
    );
};

Body.propTypes = {
    client: types.object.isRequired,
    post: types.object
};

export default withApollo(Body);
