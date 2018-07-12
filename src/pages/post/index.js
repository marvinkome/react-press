import React from 'react';
import types from 'prop-types';
import Router from 'next/router';
import { Query } from 'react-apollo';

import MainPage from '../../components/app';
import Error from '../../components/error';

import PageBody from './view';
import query from './query';
import './style.less';

export const Post = ({ loggedIn, post_name }) => {
    const renderError = () => {
        return (
            <Error
                render={
                    <div className="center">
                        <div className="center-align">
                            <img className="responsive-img" src="/static/404.png" />
                        </div>
                        <h5 className="center">
                            The content you{'\''}re looking for is currently not available
                        </h5>
                        <a onClick={() => Router.back()}>Go back to the previous page</a>
                    </div>
                }
            />
        );
    };

    return (
        <Query query={query} variables={{ post_name }}>
            {(prop) => {
                // if there's an error
                if (prop.error) return <Error render={<p>Error fetching post</p>} />;

                return prop.data.post !== null ? (
                    <MainPage
                        loggedIn={loggedIn}
                        pageTitle={prop.data.post ? prop.data.post.title : 'Post not found'}
                        render={() => <PageBody loggedIn={loggedIn} post={prop.data.post} />}
                    />
                ) : (
                    renderError()
                );
            }}
        </Query>
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
