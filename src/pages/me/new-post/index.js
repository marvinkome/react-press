import React from 'react';
import types from 'prop-types';
import { MainPage } from '../../../components/app';
import PageView from '../../../components/editorComponent';

export const NewPost = ({ loggedIn }) => {
    return <MainPage loggedIn={loggedIn} render={() => <PageView/>} />;
};

NewPost.propTypes = {
    loggedIn: types.bool.isRequired
};

export default NewPost;
