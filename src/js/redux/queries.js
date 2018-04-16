export const fetch_alls_query = `
{
    posts {
        uuid
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
                                uuid
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
