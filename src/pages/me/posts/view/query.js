import gql from 'graphql-tag';

export const deleteMutation = gql`
    mutation deletePost($postId: Int!) {
        deletePost(postId: $postId) {
            post {
                id
            }
        }
    }
`;

export default gql`
    query UserPosts($first: Int, $after: String) {
        user {
            id
            posts(first: $first, after: $after) {
                edges {
                    node {
                        uuid
                        id
                        title
                        timestamp
                        postPicUrl
                        body
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;
