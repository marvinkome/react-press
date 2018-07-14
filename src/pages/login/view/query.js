import gql from 'graphql-tag';

export default gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
        }
    }
`;
