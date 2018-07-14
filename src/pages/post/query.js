import gql from 'graphql-tag';

export default gql`
    query Post($post_name: String) {
        post(title: $post_name) {
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
            tags {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
            claps {
                totalCount
            }
            comments {
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
