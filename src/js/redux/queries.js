export const fetch_alls_query = `
{
    posts {
        uuid
        title
        body
        timestamp
        author {
            fullName
        }
        comments {
            edges{
                node{
                    uuid
                    body
                    timestamp
                    author{
                        fullName
                    }
                    replies{
                        edges{
                            node{
                                uuid
                                body
                                timestamp
                                author{
                                    fullName
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
