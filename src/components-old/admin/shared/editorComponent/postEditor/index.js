import React from 'react';
import types from 'prop-types';
import AuthorInfo from './authorCard';
import EditorForm from './editorForm.js';

export default class PostEditor extends React.Component {
    getPostToEdit = () => {
        if (this.props.post_id !== undefined) {
            // get post data
            if (this.props.user_data !== undefined) {
                const { user } = this.props.user_data;

                const user_data = user.posts.edges.find(
                    (obj) => obj.node.id === this.props.post_id
                );

                if (user_data !== undefined) {
                    // return user data
                    let tags = [];

                    user_data.node.tags.edges.map((obj) => {
                        tags = [
                            ...tags,
                            {
                                tag: obj.node.name
                            }
                        ];
                    });

                    return {
                        title: user_data.node.title,
                        body: user_data.node.body,
                        pic_url: user_data.node.postPicUrl,
                        uuid: user_data.node.uuid,
                        tags
                    };
                }
            }
        }
    };
    render() {
        const { user_data } = this.props;
        let fullName = null;
        let description = null;
        let profilePicture = null;

        if (user_data) {
            fullName = user_data.user.fullName;
            description = user_data.user.description;
            profilePicture = user_data.user.gravatarUrl;
        }

        const author_data = {
            fullName,
            description,
            profilePicture
        };

        const post_data = this.getPostToEdit() || {
            title: '',
            body: '',
            pic_url: '',
            uuid: '',
            tags: []
        };

        return (
            <div className="admin-add-post container">
                <div className="row">
                    <div className="col m12">
                        <AuthorInfo data={author_data} />
                        <EditorForm data={post_data} />
                    </div>
                </div>
            </div>
        );
    }
}

PostEditor.propTypes = {
    user_data: types.object,
    post_id: types.string
};
