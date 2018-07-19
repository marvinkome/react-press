import gql from 'graphql-tag';

export default gql`
    query PostToEdit($post_name: String!) {
        post(title: $post_name) {
            uuid
            title
            body
            postPicUrl
            tag {
                name
            }
        }
    }
`;
