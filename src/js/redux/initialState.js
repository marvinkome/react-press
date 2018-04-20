/**
 * ./src/js/redux/initialState.js
 */

const state = {
    isFetching: false,
    isLoggedIn: false,
    lastFetch: 0,
    post_data: {
        posts: [
            {
                id: 'UG9zdDox',
                title: 'Post title',
                body: 'Post body',
                timestamp: '2018-04-15T18:06:02.348044',
                postPicUrl:
                    'http://192.168.43.200:5000/static/img/posts/card.jpg',
                author: {
                    fullName: 'Kilo',
                    gravatarUrl:
                        'http://secure.gravatar.com/avatar/365e4dd9c080d6f19fbb159e43bccc9d?s=259&d=retro&r=g'
                },
                comments: {
                    edges: [
                        {
                            node: {
                                id: 'Q29tbWVudDox',
                                body: 'I love the post',
                                timestamp: '2018-04-15T18:08:20.596703',
                                author: {
                                    fullName: 'Kilo',
                                    gravatarUrl:
                                        'http://secure.gravatar.com/avatar/365e4dd9c080d6f19fbb159e43bccc9d?s=259&d=retro&r=g'
                                },
                                replies: {
                                    edges: [
                                        {
                                            node: {
                                                id: 'Q29tbWVudFJlcGx5OjE=',
                                                body: 'Seconded',
                                                timestamp:
                                                    '2018-04-15T18:09:58.142402',
                                                author: {
                                                    fullName: 'Kilo',
                                                    gravatarUrl:
                                                        'http://secure.gravatar.com/avatar/365e4dd9c080d6f19fbb159e43bccc9d?s=259&d=retro&r=g'
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ]
    },
    user_data: {},
    admin_data: {}
};

export default state;
