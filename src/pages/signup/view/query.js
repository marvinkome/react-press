import gql from 'graphql-tag';

export default gql`
    mutation createUser(
        $fullName: String!
        $email: String!
        $password: String!
        $username: String!
    ) {
        createUser(fullName: $fullName, email: $email, password: $password, username: $username) {
            token
        }
    }
`;
