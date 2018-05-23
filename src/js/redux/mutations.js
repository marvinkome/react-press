const post_query = `
    post{
        id
        uuid
        title
        body
        timestamp
        postPicUrl
        views
        author {
            id
            fullName
            description
            gravatarUrl
        }
        tags {
            edges {
                node {
                    id
                    name
                }
            }
        }
        claps {
            totalCount
        }
        comments {
            edges {
                node {
                    id
                    uuid
                    body
                    timestamp
                    author{
                        id
                        fullName
                        gravatarUrl
                    }
                    replies{
                        edges{
                            node{
                                id
                                timestamp
                                body
                                parentId
                                author{
                                    id
                                    fullName
                                    gravatarUrl
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const create_tag = (tagname, post_id) =>
    `
    mutation Mutation{
        createTag(
            tagData: {
                name: "` +
    tagname +
    `", 
                postId: ` +
    post_id +
    `
            }
        ){
            ${post_query}
        }
    }
`;

export const create_post = (post_data) =>
    `
    mutation Mutation{
        createPost(
            postData: {
                title: "` +
    post_data.title +
    `", 
                postPicUrl: "` +
    post_data.postPicUrl +
    `",
                body: ` +
    JSON.stringify(post_data.body) +
    `
            }
        ){
            ${post_query}
        }
    }
`;

export const edit_post = (post_data) =>
    `
    mutation Mutation{
        updatePost(
            ${
    post_data.title != undefined
        ? 'title: "' + post_data.title + '",'
        : ''
}
            ${
    post_data.body != undefined
        ? 'body: ' + JSON.stringify(post_data.body) + ','
        : ''
}
            ${
    post_data.postPicUrl != undefined
        ? 'postPicUrl: "' + post_data.postPicUrl + '",'
        : ''
}
            postId: ` +
    post_data.postId +
    `
        ){
            ${post_query}
        }
    }
`;

export const delete_post = (post_id) => `
    mutation Mutation{
        deletePost(postId: ${post_id}){
            post{
                title
            }
        }
    }
`;

export const update_profile_picture = (pic_url) =>
    `
    mutation Mutation{
        updateUserProfilePic(
            newPic:"` +
    pic_url +
    `"
        ){
            user{
                gravatarUrl
            }
        }
    }
`;

export const update_info = (user_data) =>
    `
    mutation Mutation{
        updateUserInfo(
            ${
    user_data.full_name != undefined
        ? 'newFullName: "' + user_data.full_name + '",'
        : ''
}
            ${
    user_data.description != undefined
        ? 'newDescription: "' +
                      user_data.description +
                      '",'
        : ''
}
        ){
            user{
                fullName
                description
            }
        }
    }
`;

export const create_comment = (comment_data) =>
    `
    mutation Mutation{
        createComment(
            body: "` +
    comment_data.body +
    `", 
            postId: ` +
    comment_data.post_id +
    `
        ){
            ${post_query}
            comment {
                id
                uuid
                body
                timestamp
                author{
                    id
                    fullName
                    gravatarUrl
                }
                replies{
                    edges{
                        node{
                            id
                            timestamp
                            body
                            parentId
                            author{
                                id
                                fullName
                                gravatarUrl
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const create_comment_reply = (reply_data) =>
    `
    mutation Mutation{
        createCommentReply(
            body: "` +
    reply_data.body +
    `", 
            parentId: ` +
    reply_data.parent_id +
    `
        ){
            ${post_query}
            commentReply{
                id
                timestamp
                body
                parentId
                author{
                    id
                    fullName
                    gravatarUrl
                }
            }
        }
    }
`;

export const clap = (clap_data) =>
    `
    mutation Mutation{
        createClap(
            postId: ` +
    clap_data.post_id +
    `
        ){
            ${post_query}
        }
    }
`;

export const viewPage = (post_id) => `
    mutation Mutation {
        viewPost(postId: ${post_id}){
            ${post_query}
        }
    }
`;
