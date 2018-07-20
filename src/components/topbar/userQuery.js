import gql from 'graphql-tag';

export const notificationQuery = gql`
    {
        user {
            id
            notifications {
                edges {
                    node {
                        id
                        type
                        timestamp
                        read
                        post {
                            id
                            title
                        }
                        fromAuthor {
                            fullName
                            gravatarUrl
                        }
                    }
                }
            }
        }
    }
`;

export default gql`
    query User {
        user {
            id
            fullName
            gravatarUrl
        }
    }
`;
