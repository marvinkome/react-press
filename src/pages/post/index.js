import React from 'react';
import types from 'prop-types';

import MainPage from '../../components/app';
import PageBody from './view';
import './style.less';

export const Post = (props) => {
    return (
        <MainPage
            loggedIn={props.loggedIn}
            pageTitle={'Post Page'}
            render={() => <PageBody {...props} />}
        />
    );
};

Post.getInitialProps = async ({ query }) => {
    return {
        post_name: decodeURIComponent(query.id)
    };
};

Post.propTypes = {
    loggedIn: types.bool.isRequired,
    post_name: types.string.isRequired
};

export default Post;
