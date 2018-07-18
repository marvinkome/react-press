import gql from 'graphql-tag';

export const clap = gql`
    mutation clap($postId: Int!) {
        createClap(postId: $postId) {
            post {
                id
            }
        }
    }
`;

export const comment = gql`
    mutation comment($postId: Int!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            post {
                id
            }
        }
    }
`;

export const replyComment = gql`
    mutation replyComment($parentId: Int!, $body: String!) {
        createCommentReply(body: $body, parentId: $parentId) {
            post {
                id
            }
        }
    }
`;
