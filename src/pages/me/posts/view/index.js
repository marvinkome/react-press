import React from 'react';
import types from 'prop-types';
import Link from 'next/link';
import { Query, Mutation, withApollo } from 'react-apollo';

import Error from '../../../../components/error';
import { createToast } from '../../../../lib/helpers';

import query, { deleteMutation } from './query';
import { Post } from './post';

const PageView = ({ client }) => {
    const render_page_header = () => {
        return (
            <div className="posts-info">
                <h1>Your posts</h1>
                <Link href={'/me/new-post'}>
                    <a className="btn btn-flat">New Post</a>
                </Link>
            </div>
        );
    };

    const render_no_post = () => {
        return (
            <div className="container">
                <h5 className="center">No Posts</h5>
            </div>
        );
    };

    const render_posts = (posts, delete_post) => {
        return posts.map((post) => (
            <Post
                key={post.node.id}
                post={post}
                handleDelete={(id) => handleDelete(id, delete_post)}
            />
        ));
    };

    const render_pagination = (fetchMore, cursor) => {
        return (
            <div className="col s12 center pagination">
                <a className="btn btn-large" onClick={() => handleMore(fetchMore, cursor)}>
                    Show more
                </a>
            </div>
        );
    };

    const handleDelete = (postId, delete_post) => {
        const confirmDelete = confirm('This post will be permanently deleted');
        if (confirmDelete == true) {
            delete_post({
                variables: {
                    postId
                }
            });
        }
    };

    const handleMore = (fetchMore, cursor) => {
        return fetchMore({
            variables: {
                after: cursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.user.posts.edges;
                const pageInfo = fetchMoreResult.user.posts.pageInfo;

                return newEdges.length
                    ? {
                        user: {
                            id: fetchMoreResult.user.id,
                            posts: {
                                __typename: previousResult.user.posts.__typename,
                                edges: [...previousResult.user.posts.edges, ...newEdges],
                                pageInfo
                            },
                            __typename: previousResult.user.__typename
                        }
                    }
                    : previousResult;
            }
        });
    };

    const deleteError = () => createToast('Error deleting post');

    return (
        <Query query={query} variables={{ first: 5 }}>
            {({ data, error, fetchMore }) => {
                if (error) return <Error render={<p>There was an error fetching post</p>} />;

                const edges = data.user ? data.user.posts.edges : [];
                const hasMore = data.user ? data.user.posts.pageInfo.hasNextPage : false;
                const endCursor = data.user ? data.user.posts.pageInfo.endCursor : '';

                return (
                    <Mutation mutation={deleteMutation} onError={deleteError} 
                        onCompleted={() => client.resetStore()}>
                        {(delete_post) => {
                            return (
                                <div className="main admin-posts">
                                    {edges && (
                                        <div>
                                            {render_page_header()}
                                            <div className="posts-list">
                                                {edges.length > 0
                                                    ? render_posts(edges, delete_post)
                                                    : render_no_post()}
                                            </div>
                                            {hasMore && render_pagination(fetchMore, endCursor)}
                                        </div>
                                    )}
                                </div>
                            );
                        }}
                    </Mutation>
                );
            }}
        </Query>
    );
};

PageView.propTypes = {
    client: types.object.isRequired
};

export default withApollo(PageView);
