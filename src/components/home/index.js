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
        data: state.post_data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetch_data: () => dispatch(fetch_all_data())
    };
};

export const PostID = React.createContext();

class Home extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     value: {
        //         data: [],
        //         isFetching: false
        //     }
        // };

        this.state = {
            value: {
                data: this.props.data.posts,
                isFetching: this.props.isFetching
            }
        };
    }

    // componentWillReceiveProps(np) {
    //     this.setState({
    //         value: {
    //             data: np.data.posts,
    //             isFetching: np.isFetching
    //         }
    //     });
    // }

    componentDidMount() {
        // this.props.fetch_data();
    }

    render() {
        return (
            <PostID.Provider value={this.state.value}>
                <View />
            </PostID.Provider>
        );
    }
}

Home.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    fetch_data: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
