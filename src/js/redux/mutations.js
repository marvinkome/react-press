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
            post{
                id
                uuid
                title
                body
                timestamp
                postPicUrl
                author {
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
                    edges {
                        node {
                            id
                        }
                    }
                }
                comments {
                    edges {
                        node {
                            id
                            uuid
                            body
                            timestamp
                            author{
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
        }
    }
`;

export const create_post = post_data =>
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
                userId: ` +
    post_data.userId +
    `
            }
        ){
            post{
                id
                uuid
                title
                body
                timestamp
                postPicUrl
                author {
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
                    edges {
                        node {
                            id
                        }
                    }
                }
                comments {
                    edges {
                        node {
                            id
                            uuid
                            body
                            timestamp
                            author{
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
        }
    }
`;

export const edit_post = post_data =>
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
            post{
                id
                uuid
                title
                body
                timestamp
                postPicUrl
                author {
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
                    edges {
                        node {
                            id
                        }
                    }
                }
                comments {
                    edges {
                        node {
                            id
                            uuid
                            body
                            timestamp
                            author{
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
        }
    }
`;

export const delete_post = post_id => `
    mutation Mutation{
        deletePost(postId: ${post_id}){
            post{
                title
            }
        }
    }
`;

export const update_profile_picture = (pic_url, user_id) =>
    `
    mutation Mutation{
        updateUserProfilePic(
            userId:` +
    user_id +
    `,
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

export const update_info = user_data =>
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
        ? 'newDescription: "' + user_data.description + '",'
        : ''
}
            userId: ` +
    user_data.user_id +
    `
        ){
            user{
                fullName
                description
            }
        }
    }
`;

export const create_comment = comment_data =>
    `
    mutation Mutation{
        createComment(
            body: "` +
    comment_data.body +
    `", 
            userId: ` +
    comment_data.user_id +
    `,
            postId: ` +
    comment_data.post_id +
    `
        ){
            post{
                id
                uuid
                title
                body
                timestamp
                postPicUrl
                author {
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
                    edges {
                        node {
                            id
                        }
                    }
                }
                comments {
                    edges {
                        node {
                            id
                            uuid
                            body
                            timestamp
                            author{
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
            comment {
                id
                uuid
                body
                timestamp
                author{
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

export const create_comment_reply = reply_data =>
    `
    mutation Mutation{
        createCommentReply(
            body: "` +
    reply_data.body +
    `", 
            userId: ` +
    reply_data.user_id +
    `,
            parentId: ` +
    reply_data.parent_id +
    `
        ){
            post{
                id
                uuid
                title
                body
                timestamp
                postPicUrl
                author {
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
                    edges {
                        node {
                            id
                        }
                    }
                }
                comments {
                    edges {
                        node {
                            id
                            uuid
                            body
                            timestamp
                            author{
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
            commentReply{
                id
                timestamp
                body
                parentId
                author{
                    fullName
                    gravatarUrl
                }
            }
        }
    }
`;

export const clap = clap_data =>
    `
    mutation Mutation{
        createClap(
            userId: ` +
    clap_data.user_id +
    `,
            postId: ` +
    clap_data.post_id +
    `
        ){
            post{
                id
                uuid
                title
                body
                timestamp
                postPicUrl
                author {
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
                    edges {
                        node {
                            id
                        }
                    }
                }
                comments {
                    edges {
                        node {
                            id
                            uuid
                            body
                            timestamp
                            author{
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
        }
    }
`;
