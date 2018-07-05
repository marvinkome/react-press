/**
 * ./src/components/post/view/topbar
 */

import React, { Component } from 'react';
import types from 'prop-types';
import { MdThumbUp } from 'react-icons/lib/md';

class FAB extends Component {
    constructor() {
        super();

        this.fabRef = React.createRef();
    }
    componentDidMount() {
        const fab = this.fabRef.current;
        window.M.FloatingActionButton.init(fab);
    }
    render() {
        return (
            <div ref={this.fabRef} className="fixed-action-btn">
                <a onClick={this.props.onClap} className="pulse btn-floating btn-large">
                    <MdThumbUp />
                </a>
                <ul>
                    <li>
                        <a className="btn-floating btn-num">{this.props.claps_count}</a>
                    </li>
                </ul>
            </div>
        );
    }
}

FAB.propTypes = {
    claps_count: types.number.isRequired,
    onClap: types.func.isRequired
};

export default FAB;
