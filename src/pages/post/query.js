import gql from 'graphql-tag';

export default gql`
    query Post($post_name: String) {
        post(title: $post_name) {
            uuid
            title
            postPicUrl
            body
            timestamp
            author {
                id
                gravatarUrl
                fullName
                description
            }
            tag {
                name
            }
            claps {
                totalCount
            }
            comments {
                edges {
                    node {
                        uuid
                        id
                        body
                        timestamp
                        author {
                            id
                            fullName
                            gravatarUrl
                        }
                        replies {
                            edges {
                                node {
                                    id
                                    body
                                    timestamp
                                    author {
                                        id
                                        fullName
                                        gravatarUrl
                                    }
                                }
                            }
                        }
                    }
                }
            }
            nextTitle
            prevTitle
        }
    }
`;
