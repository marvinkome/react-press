const post_query = `
    node{
        id
        uuid
        title
        body
        timestamp
        postPicUrl
        views
        author {
            id
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
                        id
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
    }
`;

export const fetch_query = `
    {
        allPost(first:12, sortBy:"timestamp"){
            edges{
                ${post_query}
            }
            pageInfo{
                endCursor
                hasNextPage
            }
        }
    }
`;

export const fetch_more = (last_cursor) => `
{
    allPost(first:12, sortBy:"timestamp", after:"${last_cursor}"){
        edges{
            ${post_query}
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
                        views
                        tags{
                            edges{
                                node{
                                    id
                                    name
                                }
                            }
                        }
                        claps {
                            totalCount
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

export const fetch_profile_query = (fullname) => `
{
    publicUser(name: "${fullname}"){
      id
      fullName
      description
      memberSince
      gravatarUrl
      posts(first:5){
        edges{
          node{
            id
            title
            timestamp
            body
            postPicUrl
          }
        }
      }
    }
  }
`;
