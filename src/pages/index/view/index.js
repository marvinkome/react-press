import React from 'react';
import { Query } from 'react-apollo';
import Error from '../../../components/error';
import query from './query';
import PostCard from './post-card';

export class Body extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postPerPage: 6,
            pageCursor: 1
        };
    }

    goToPrevPage = (e, fetchMore, startCursor) => {
        e && e.preventDefault();

        if (this.hasPrev()) {
            const pageCursor = this.state.pageCursor - 1;
            fetchMore({
                variables: {
                    first: null,
                    after: null,
                    last: this.state.postPerPage,
                    before: startCursor
                },
                updateQuery: (prev, newData) => {
                    const newEdges = newData.fetchMoreResult.allPost.edges;
                    return newEdges.length ? newData.fetchMoreResult : prev;
                }
            });
            this.setState({ pageCursor });
        }
    };

    goToNextPage = (e, totalCount, fetchMore, endCursor) => {
        e && e.preventDefault();

        if (this.hasNext(totalCount)) {
            const pageCursor = this.state.pageCursor + 1;
            fetchMore({
                variables: {
                    last: null,
                    before: null,
                    first: this.state.postPerPage,
                    after: endCursor
                },
                updateQuery: (prev, newData) => {
                    const newEdges = newData.fetchMoreResult.allPost.edges;
                    return newEdges.length ? newData.fetchMoreResult : prev;
                }
            });
            this.setState({ pageCursor });
        }
    };

    hasNext = (totalCount) => {
        return this.state.postPerPage * this.state.pageCursor < totalCount;
    };

    hasPrev = () => {
        return this.state.pageCursor === 1;
    };

    render_pagination = (pageInfo, totalCount, fetchMore) => {
        const hasNext = this.hasNext(totalCount);
        const hasPrevious = this.hasPrev();

        return (
            <div className="row pagination">
                {!hasPrevious && (
                    <div className="col s4 z-depth-1">
                        <p>
                            <a
                                onClick={(e) =>
                                    this.goToPrevPage(e, fetchMore, pageInfo.startCursor)
                                }
                            >
                                Previous Page
                            </a>
                        </p>
                    </div>
                )}
                {hasNext && (
                    <div className="col s4 next z-depth-1">
                        <p>
                            <a
                                onClick={(e) =>
                                    this.goToNextPage(e, totalCount, fetchMore, pageInfo.endCursor)
                                }
                            >
                                Next Page
                            </a>
                        </p>
                    </div>
                )}
            </div>
        );
    };

    render_post_cards = (posts) => {
        if (posts.length) {
            return posts.map((obj) => (
                <div key={obj.node.id} className="col l6 s12">
                    <PostCard post={obj.node} />
                </div>
            ));
        } else {
            return (
                <div className="col s12">
                    <h5 className="center">They{'\''}re currently no post available.</h5>
                </div>
            );
        }
    };

    render() {
        let variables = { first: this.state.postPerPage };

        return (
            <Query query={query} variables={variables}>
                {(props) => {
                    // if there's an error
                    if (props.error) return <Error render={<p>Error fetching posts</p>} />;
                    
                    const posts = props.data.allPost;

                    return posts ? (
                        <div className="home-body section container">
                            <div className="row">{this.render_post_cards(posts.edges)}</div>
                            {posts.edges.length ?
                                this.render_pagination(
                                    props.data.allPost.pageInfo,
                                    props.data.allPost.totalCount,
                                    props.fetchMore
                                ) : null }
                        </div>
                    ) : null;
                }}
            </Query>
        );
    }
}

export default Body;
