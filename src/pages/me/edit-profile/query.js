import gql from 'graphql-tag';

export const updateProfile = gql`
    mutation updateProfile($newName: String, $newDesc: String) {
        updateUserInfo(newFullName: $newName, newDescription: $newDesc) {
            user {
                id
                fullName
                description
            }
        }
    }
`;

export default gql`
    query profileUpdateData {
        user {
            id
            uuid
            fullName
            description
            gravatarUrl
        }
    }
`;
