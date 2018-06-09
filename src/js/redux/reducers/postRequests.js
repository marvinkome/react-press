import { updateNestedItemArray, updateObject } from './utils';

// Post requests
export const requestCommentFinished = (state, post, comment, data) => {
    const isSendingComment = false;

    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            data.post_id,
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
                        data.post_id,
                        (selected_post) =>
                            updateObject(selected_post, {
                                node: {
                                    ...post
                                }
                            }),
                        'uuid'
                    )
                }),
                comments: updateObject(state.user_data.data.user.comments, {
                    edges: state.user_data.data.user.comments.edges.concat({
                        node: {
                            ...comment
                        }
                    })
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isSendingComment,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

export const requestCommentReplyFinished = (state, post, comment_rep, data) => {
    const isSendingComment = false;

    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            data.post_id,
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
                        data.post_id,
                        (selected_post) =>
                            updateObject(selected_post, {
                                node: {
                                    ...post
                                }
                            }),
                        'uuid'
                    )
                }),
                commentReplies: updateObject(state.user_data.data.user.commentReplies, {
                    edges: state.user_data.data.user.commentReplies.edges.concat({
                        node: {
                            ...comment_rep
                        }
                    })
                })
            })
        })
    });

    const new_state = updateObject(state, {
        isSendingComment,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

export const requestClapFinished = (state, post, data) => {
    const isClapping = false;

    const new_post = updateObject(state.post_data, {
        posts: updateNestedItemArray(
            state.post_data.posts,
            data.post_id,
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
                        data.post_id,
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
        isClapping,
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};

export const requestViewPageFinished = (state, post, post_id) => {
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

    // check if user is logged in
    if (state.user_data.data == undefined) {
        const new_state = updateObject(state, {
            post_data: new_post
        });

        return new_state;
    }

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
        post_data: new_post,
        user_data: new_user
    });

    return new_state;
};
