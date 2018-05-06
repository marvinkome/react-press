/**
 * ./src/components/admin/dashboard
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { delete_post } from '../../../../js/redux/actions';
import { format_date, truncate } from '../../../../js/helpers';

const mapStateToProps = state => ({
    data: state.user_data
});

const mapDispatchToProps = dispatch => ({
    delete_post: post_id => dispatch(delete_post(post_id))
});

class Body extends Component {
    constructor(props){
        super(props);

        this.accordion = React.createRef();
        this.instance = null;
    }
    componentDidMount(){
        const elem = this.accordion.current;
        this.instance = window.M.Collapsible.init(elem);
    }
    componentWillUnmount(){
        if (this.instance !== null){
            this.instance.close();
            this.instance.destroy();
        }
    }
    handleDelete(id) {
        const confirmDelete = confirm('This post will be permanently deleted');
        if (confirmDelete == true) {
            this.props.delete_post(id);
        }
    }
    render() {
        const data = this.props.data.data;
        if (data != undefined) {
            data.user.posts.edges.sort((a, b) => {
                if (a.node.timestamp > b.node.timestamp) {
                    return -1;
                }
                if (a.node.timestamp < b.node.timestamp) {
                    return 1;
                }
                return 0;
            });
        }

        return (
            <div className="main admin-posts">
                {data && (
                    <div>
                        <div className="posts-info">
                            <h5 className="center">
                                <span>
                                    All Post ({data.user.posts.edges.length}){' '}
                                </span>
                            </h5>
                        </div>
                        <div className="posts-list">
                            {data.user.posts.edges.length > 0 ? (
                                <ul ref={this.accordion} className="collapsible popout">
                                    {data.user.posts.edges.map(post => (
                                        <li key={post.node.id}>
                                            <div className="collapsible-header">
                                                <span className="post-title">
                                                    {post.node.title}
                                                    <i className="material-icons">arrow_drop_down</i>
                                                </span>
                                                <span>{format_date(post.node.timestamp)}</span>
                                            </div>

                                            <div className="collapsible-body">
                                                <div className="post-body" dangerouslySetInnerHTML={{
                                                    __html: truncate(post.node.body, 30)
                                                }}/>

                                                <div className="post-tags">
                                                    <p>
                                                        Tags:{' '}
                                                        {post.node.tags.edges.map(
                                                            tag => (
                                                                <span
                                                                    key={
                                                                        tag
                                                                            .node
                                                                            .id
                                                                    }
                                                                >
                                                                    {
                                                                        tag
                                                                            .node
                                                                            .name
                                                                    },{' '}
                                                                </span>
                                                            )
                                                        )}
                                                    </p>
                                                </div>

                                                <div className="post-claps">
                                                    <p>
                                                        Claps:{' '}
                                                        {post.node.claps.totalCount};<br/>
                                                        Viewed:{' '}
                                                        {post.node.views != null ? post.node.views : 0}
                                                        {' times'}
                                                    </p>
                                                </div>
                                                
                                                <div className="actions">
                                                    <p>
                                                        <Link
                                                            to={
                                                                '/post/' +
                                                                post.node.id
                                                            }
                                                            title="View"
                                                            className="btn btn-flat"
                                                        >
                                                            <span className="view">
                                                                View
                                                            </span>
                                                        </Link>
                                                        <Link
                                                            to={
                                                                '/admin/edit-post/' +
                                                                post.node.id
                                                            }
                                                            title="Edit"
                                                            className="btn btn-flat"
                                                        >
                                                            <span className="edit">
                                                                Edit
                                                            </span>
                                                        </Link>
                                                        <a
                                                            onClick={() =>
                                                                this.handleDelete(
                                                                    post.node
                                                                        .uuid
                                                                )
                                                            }
                                                            title="Delete"
                                                            className="btn btn-flat"
                                                            style={{
                                                                cursor:
                                                                    'pointer'
                                                            }}
                                                        >
                                                            <span className="delete">
                                                                Delete
                                                            </span>
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="container">
                                    <h5 className="center">No Posts</h5>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

Body.propTypes = {
    data: PropTypes.object.isRequired,
    delete_post: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
