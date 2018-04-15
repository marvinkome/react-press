/**
 * ./src/components/home
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetch_all_data } from '../../js/redux/actions';

import View from './view';

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching,
        data: state.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetch_data: () => dispatch(fetch_all_data())
    };
};

export const PostID = React.createContext();

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: {
                data: [],
                id: '',
                isFetching: false
            }
        };
    }

    componentWillReceiveProps(np) {
        const post_id = np.match.params.id;
        const posts = np.data.posts;
        this.setState({
            value: {
                data: posts,
                id: post_id,
                isFetching: np.isFetching
            }
        });
    }

    componentDidMount() {
        this.props.fetch_data();
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
    data: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    fetch_data: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
