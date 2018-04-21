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
    componentDidMount() {
        const fab = this.fabRef.current;
        window.M.FloatingActionButton.init(fab);
    }
    // componentWillReceiveProps(np){
    //     console.log(np.claps_count);
    //     const claps_count = np.claps_count;
    //     this.setState({
    //         claps: claps_count
    //     });
    // }
    onClap = () => {
        this.setState({
            claps: this.state.claps + 1
        });
    };
    render() {
        return (
            <div ref={this.fabRef} className="fixed-action-btn">
                <a onClick={this.onClap} className="btn-floating btn-large">
                    <i className="fa fa-thumbs-up" />
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
    claps_count: PropTypes.number.isRequired
};

export default FAB;
