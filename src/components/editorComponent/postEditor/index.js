import React from 'react';
import types from 'prop-types';
import AuthorInfo from './authorCard';
import EditorForm from './editorForm.js';

export const PostEditor = ({ user_data, post_data }) => {
    return (
        <div className="admin-add-post container">
            <div className="row">
                <div className="col m12">
                    <AuthorInfo data={user_data} />
                    <EditorForm data={post_data} />
                </div>
            </div>
        </div>
    );
};

PostEditor.propTypes = {
    user_data: types.object,
    post_data: types.object
};

export default PostEditor;
