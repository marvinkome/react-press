export const fetch_query = `
    {
        allPost(first:12, sortBy:"timestamp"){
            edges{
                node{
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
                        totalCount
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
            pageInfo{
                endCursor
                hasNextPage
            }
        }
    }
`;

export const fetch_more = last_cursor => `
{
    allPost(first:12, sortBy:"timestamp", after:"${last_cursor}"){
        edges{
            node{
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
                    totalCount
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
            cursor
        }
        pageInfo{
            endCursor
            hasNextPage
        }
    }
}
`;

export const fetch_user_data_query = `
    {
        user{
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
                        timestamp
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
