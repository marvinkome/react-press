export const fetch_query = `
    {
        posts {
            id
            uuid
            title
            body
            timestamp
            postPicUrl
            author {
                fullName
                description
                gravatarUrl
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
                edges {
                    node {
                        id
                    }
                }
            }
            comments {
                edges {
                    node {
                        id
                        uuid
                        body
                        timestamp
                        author{
                            fullName
                            gravatarUrl
                        }
                        replies{
                            edges{
                                node{
                                    id
                                    timestamp
                                    body
                                    parentId
                                    author{
                                        fullName
                                        gravatarUrl
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const fetch_user_data_query = `
    {
        user(uuid:1){
            id
            uuid
            fullName
            gravatarUrl
            description
            posts{
                edges{
                    node{
                        id
                        uuid
                        title
                        body
                        postPicUrl
                        tags{
                            edges{
                                node{
                                    id
                                    name
                                }
                            }
                        }
                    }
                }
            }
            comments{
                edges{
                    node{
                        id
                        body
                    }
                }
            }
            commentReplies{
                edges{
                    node{
                        id
                        body
                    }
                }
            }
        }
    }
`;
