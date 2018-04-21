/**
 * ./src/components/Post
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetch_all_data, fetch_user_data } from '../../js/redux/actions';

import View from './view';

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching,
        isLoggedIn: state.isLoggedIn,
        data: state.post_data,
        user_data: state.user_data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetch_data: () => dispatch(fetch_all_data()),
        fetch_user_data: () => dispatch(fetch_user_data())
    };
};

export const PostID = React.createContext();

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: {
                id: '',
                data: [],
                user_data: {},
                isFetching: false
            }
        };
    }

    componentWillReceiveProps(np) {
        this.setState({
            value: {
                id: np.match.params.id,
                data: np.data.posts,
                user_data: np.user_data,
                isFetching: np.isFetching
            }
        });
    }

    componentDidMount() {
        this.props.fetch_data();
        if (this.props.isLoggedIn) {
            this.props.fetch_user_data();
        }
    }

    render() {
        return (
            <PostID.Provider value={this.state.value}>
                <View />
            </PostID.Provider>
        );
    }
}

Post.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    fetch_data: PropTypes.func.isRequired,
    fetch_user_data: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user_data: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
