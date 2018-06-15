/**
 * ./src/components/admin/dashboard<TopBar />
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { delete_post } from '../../../../js/redux/actions';
import TopBar from '../../../helpers/topbar';
import { Posts } from './posts';

class Body extends Component {
    constructor(props) {
        super(props);

        this.accordion = React.createRef();
        this.instance = null;
    }
    componentDidMount() {
        const elem = this.accordion.current;
        this.instance = window.M.Collapsible.init(elem);
    }
    componentWillUnmount() {
        if (this.instance !== null) {
            this.instance.close();
            this.instance.destroy();
        }
    }
    handleDelete = (id) => {
        const confirmDelete = confirm('This post will be permanently deleted');
        if (confirmDelete == true) {
            this.props.delete_post(id);
        }
    };
    render_page_header = () => (
        <div className="posts-info">
            <h1>Your posts</h1>
            <Link to={'/admin/new-post'} className="btn btn-flat">
                New Post
            </Link>
        </div>
    );
    render_no_post = () => (
        <div className="container">
            <h5 className="center">No Posts</h5>
        </div>
    );
    render() {
        const data = this.props.data.data;
        const handleDelete = this.handleDelete;
        const post_props = {
            data,
            handleDelete
        };
        return (
            <React.Fragment>
                <TopBar user_data={data} />
                <div className="main admin-posts">
                    {data && (
                        <div>
                            {this.render_page_header()}
                            <div className="posts-list">
                                {data.user.posts.edges.length > 0 ? (
                                    <Posts {...post_props} />
                                ) : (
                                    this.render_no_post()
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

Body.propTypes = {
    data: PropTypes.object.isRequired,
    delete_post: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    data: state.user_data
});

const mapDispatchToProps = (dispatch) => ({
    delete_post: (post_id) => dispatch(delete_post(post_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);
