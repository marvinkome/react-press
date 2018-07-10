import gql from 'graphql-tag';

export default gql`
    query PublicProfile($user_name: String) {
        publicUser(name: $user_name) {
            id
            fullName
            description
            memberSince
            gravatarUrl
            posts(first: 5) {
                edges {
                    node {
                        id
                        title
                        timestamp
                        body
                        postPicUrl
                    }
                }
            }
        }
    }
`;
