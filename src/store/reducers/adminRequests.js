import { updateNestedItemArray, updateObject, removeItemInNestedArray } from './utils';

// After request is complete

// admin requests
export const requestTagsFinished = (state, tag_post, post_id) => {
    const isFetching = false;
    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            post_id,
            (post) =>
                updateObject(post, {
                    node: {
                        ...tag_post
                    }
                }),
            'uuid'
        )
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: updateNestedItemArray(
                        state.user_data.data.user.posts.edges,
                        post_id,
                        (post) =>
                            updateObject(post, {
                                node: {
                                    ...tag_post
                                }
                            }),
                        'uuid'
                    )
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isFetching,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

export const requestPostsFinished = (state, post) => {
    const isFetching = false;
    const new_post = updateObject(state.post_data, {
        posts: state.post_data.posts.concat({
            node: {
                ...post
            }
        })
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: state.user_data.data.user.posts.edges.concat({
                        node: {
                            ...post
                        }
                    })
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isFetching,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

export const requestEditPostFinished = (state, post, post_id) => {
    const isFetching = false;

    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            post_id,
            (selected_post) =>
                updateObject(selected_post, {
                    node: {
                        ...post
                    }
                }),
            'uuid'
        )
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: updateNestedItemArray(
                        state.user_data.data.user.posts.edges,
                        post_id,
                        (selected_post) =>
                            updateObject(selected_post, {
                                node: {
                                    ...post
                                }
                            }),
                        'uuid'
                    )
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isFetching,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

export const requestDeletePostFinished = (state, post_id) => {
    const isFetching = false;

    const new_post = updateObject(state.post_data, {
        posts: removeItemInNestedArray(state.post_data.posts, post_id, 'uuid')
    });

    const new_user = updateObject(state.user_data, {
        data: updateObject(state.user_data.data, {
            user: updateObject(state.user_data.data.user, {
                posts: updateObject(state.user_data.data.user.posts, {
                    edges: removeItemInNestedArray(
                        state.user_data.data.user.posts.edges,
                        post_id,
                        'uuid'
                    )
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isFetching,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

export const requestUserEditFinished = (state) => {
    return updateObject(state, {
        isFetching: false
    });
};
