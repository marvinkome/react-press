import gql from 'graphql-tag';

export const createPost = gql`
    mutation createPost($title: String!, $body: String!, $postPicUrl: String, $tag: String) {
        createPost(title: $title, body: $body, postPicUrl: $postPicUrl, tag: $tag) {
            post {
                id
            }
        }
    }
`;

export default gql`
    query UserNewPostData {
        user {
            id
            fullName
            description
            gravatarUrl
        }
    }
`;
