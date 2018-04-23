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
            tag{
                name
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
                body: ` +
    JSON.stringify(post_data.body) +
    `
                userId: ` +
    post_data.userId +
    `
            }
        ){
            post{
                uuid
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
        ? 'body: "' + post_data.body + '",'
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
                title
                body
                postPicUrl
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
        updateuserProfilePic(
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
