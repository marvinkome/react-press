/**
 * ./src/components/post/view/topbar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FAB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            claps: this.props.claps_count
        };
        this.fabRef = React.createRef();
    }
    componentWillReceiveProps(np) {
        if (this.state.claps != np.claps_count) {
            this.setState({
                claps: np.claps_count
            });
        }
    }
    componentDidMount() {
        const fab = this.fabRef.current;
        window.M.FloatingActionButton.init(fab);
    }
    render() {
        return (
            <div ref={this.fabRef} className="fixed-action-btn">
                <a
                    onClick={this.props.handleClap}
                    className="pulse btn-floating btn-large"
                >
                    <i className="material-icons">thumb_up</i>
                </a>
                <ul>
                    <li>
                        <a className="btn-floating btn-num">
                            {this.state.claps}
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

FAB.propTypes = {
    claps_count: PropTypes.number.isRequired,
    handleClap: PropTypes.func
};

export default FAB;
