/**
 * ./src/components/admin/helpers/sidenav
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    data: state.user_data
});

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.sideNav = React.createRef();
        this.collapsible = React.createRef();
    }
    componentDidMount() {
        const sidenav = this.sideNav.current;
        const collapsible = this.collapsible.current;
        window.M.Sidenav.init(sidenav);
        window.M.Collapsible.init(collapsible);
    }
    componentWillUnmount() {
        const sidenav = this.sideNav.current;
        const instance = window.M.Sidenav.getInstance(sidenav);
        instance.destroy();
    }
    render() {
        let display_name, pic_url;

        if (this.props.data.data != undefined) {
            const data = this.props.data.data.user;
            display_name = data.fullName;
            pic_url = data.gravatarUrl;
        } else {
            display_name = '';
            pic_url = '';
        }
        return (
            <div>
                <nav className="admin-nav white">
                    <div className="nav-wrapper">
                        <a className="brand-logo">ReactPress</a>
                        <a
                            data-target="mobile-demo"
                            className="sidenav-trigger"
                        >
                            <i className="fa fa-bars" />
                        </a>
                    </div>
                </nav>
                <ul
                    ref={this.sideNav}
                    className="sidenav sidenav-fixed"
                    id="mobile-demo"
                >
                    <li className="grey darken-4">
                        <div className="user-view">
                            <div className="background" />
                            <a>
                                <img className="circle" src={pic_url} />
                            </a>
                            <a>
                                <span className="name">{display_name}</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <ul
                            ref={this.collapsible}
                            className="collapsible collapsible-accordion"
                        >
                            <li>
                                <a className="collapsible-header">
                                    <span>Posts</span>
                                    <i className="fa fa-angle-down" />
                                </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <Link to="/admin/posts">
                                                All Posts
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/new-post">
                                                New Post
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="divider" />
                    </li>
                    <li>
                        <Link to="/admin/edit-profile">Edit Profile</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

SideNav.propTypes = {
    data: PropTypes.object
};
export default connect(mapStateToProps)(SideNav);
