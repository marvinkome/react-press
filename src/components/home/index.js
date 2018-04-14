/**
 * ./src/components/home
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { fetch_data } from '../../js/redux/actions';

import View from './view';

const mapStateToProps = state => {
    return {
        data: state.data
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         fetch_data: () => dispatch(fetch_data())
//     };
// };

class Home extends Component {
    componentDidMount() {
        // this.props.fetch_data();
    }
    render() {
        return <View data={this.props.data} />;
    }
}

Home.propTypes = {
    // fetch_data: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default connect(mapStateToProps)(Home);
