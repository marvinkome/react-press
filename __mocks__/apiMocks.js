export const fetch_data_mock = {
    data: {
        allPost: {
            edges: [
                {
                    node: {
                        id: 'UG9zdDox',
                        uuid: '1',
                        title: 'Hello World',
                        body: '<div><p>Hey there im new</p>\n</div>',
                        timestamp: '2018-06-05T01:28:35.802157',
                        postPicUrl: '',
                        views: 16,
                        author: {
                            id: 'VXNlcjoy',
                            fullName: 'Marvin Kome',
                            description: null,
                            gravatarUrl: null
                        },
                        tags: {
                            edges: [
                                {
                                    node: {
                                        id: 'VGFnczox',
                                        name: 'hello'
                                    }
                                }
                            ]
                        },
                        claps: {
                            totalCount: 0
                        },
                        comments: {
                            edges: [
                                {
                                    node: {
                                        id: 'Q29tbWVudDox',
                                        uuid: '1',
                                        body: 'Hello World',
                                        timestamp: '2018-06-05T01:30:59.729280',
                                        author: {
                                            id: 'VXNlcjox',
                                            fullName: 'Fake User',
                                            gravatarUrl: null
                                        },
                                        replies: {
                                            edges: []
                                        }
                                    }
                                },
                                {
                                    node: {
                                        id: 'Q29tbWVudDoy',
                                        uuid: '2',
                                        body: 'Notify Marvin Correctly',
                                        timestamp: '2018-06-05T02:09:39.718090',
                                        author: {
                                            id: 'VXNlcjox',
                                            fullName: 'Fake User',
                                            gravatarUrl: null
                                        },
                                        replies: {
                                            edges: []
                                        }
                                    }
                                },
                                {
                                    node: {
                                        id: 'Q29tbWVudDoz',
                                        uuid: '3',
                                        body: 'Hello Marvin',
                                        timestamp: '2018-06-05T11:58:49.746609',
                                        author: {
                                            id: 'VXNlcjox',
                                            fullName: 'Fake User',
                                            gravatarUrl: null
                                        },
                                        replies: {
                                            edges: []
                                        }
                                    }
                                },
                                {
                                    node: {
                                        id: 'Q29tbWVudDo0',
                                        uuid: '4',
                                        body: 'Hello Marvin',
                                        timestamp: '2018-06-09T01:46:10.115571',
                                        author: {
                                            id: 'VXNlcjox',
                                            fullName: 'Fake User',
                                            gravatarUrl: null
                                        },
                                        replies: {
                                            edges: []
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
            ],
            pageInfo: {
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false
            }
        }
    }
};
