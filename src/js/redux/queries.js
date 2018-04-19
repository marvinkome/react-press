export const fetch_alls_query = `
{
    posts {
        id
        title
        body
        timestamp
        postPicUrl
        author {
            fullName
            gravatarUrl
        }
        comments {
            edges{
                node{
                    id
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
                                body
                                timestamp
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
