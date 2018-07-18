import React, { Component } from 'react';
import types from 'prop-types';
import { Query, Mutation, withApollo } from 'react-apollo';

import redirect from '../../lib/redirect';
import { createToast } from '../../lib/helpers';
import PostEditor from './postEditor';
import query, { createPost } from './query';
import './style.less';

export const { Provider, Consumer } = React.createContext();

export const Body = ({ post_id, client }) => {
    const onCompleted = async () => {
        await client.resetStore();
        await redirect({}, '/me/posts');
    };

    const onError = () => createToast('Error creating post, try again');

    const publishPost = (post_data, create_post) => {
        let { title, body, postPicUrl, topic: tag } = post_data;

        if ( postPicUrl === '' ) postPicUrl = null;
        if ( tag === '' ) tag = null;

        create_post({ variables: { title, body, postPicUrl, tag } });
    };

    return (
        <Query query={query}>
            {({ data }) => {
                return (
                    <Mutation mutation={createPost} onCompleted={onCompleted} onError={onError}>
                        {(create_post) => {
                            return (
                                <Provider value={(data) => publishPost(data, create_post )}>
                                    <PostEditor user_data={data} post_id={post_id} />
                                </Provider>
                            );
                        }}
                    </Mutation>
                );
            }}
        </Query>
    );
};
export class Bodyq extends Component {
    publishPost = async (data, tags, editPage = false) => {
        if (editPage) {
            try {
                const post_data = await this.props.edit_post(data);

                tags.map((tagObj) =>
                    this.props.create_tag({
                        tag_name: tagObj.tag,
                        post_id: post_data.post_id
                    })
                );

                createToast('Post has been edited');
                return true;
            } catch (e) {
                createToast('Error can\'t save post');
                return false;
            }
        } else {
            try {
                const post_data = await this.props.create_post(data);

                tags.map((tagObj) =>
                    this.props.create_tag({
                        tag_name: tagObj.tag,
                        post_id: post_data.post.data.createPost.post.uuid
                    })
                );

                createToast('Post has been created');
                return true;
            } catch (e) {
                createToast('Error creating post');
                return false;
            }
        }
    };
}

Body.propTypes = {
    client: types.object.isRequired,
    post_id: types.string,
    edit_post: types.func
};

export default withApollo(Body);
