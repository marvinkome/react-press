import gql from 'graphql-tag';

export const createPostMutation = gql`
    mutation createPost($title: String!, $body: String!, $postPicUrl: String, $tag: String) {
        createPost(title: $title, body: $body, postPicUrl: $postPicUrl, tag: $tag) {
            post {
                id
            }
        }
    }
`;

export const editPostMutation = gql`
    mutation EditPost(
        $body: String
        $title: String
        $tag: String
        $postPicUrl: String
        $postId: Int!
    ) {
        updatePost(
            body: $body
            tag: $tag
            title: $title
            postPicUrl: $postPicUrl
            postId: $postId
        ) {
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
