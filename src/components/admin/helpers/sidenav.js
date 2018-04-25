/**
 * ./src/components/admin/helpers/sidenav
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetch_user_data } from '../../../js/redux/actions';

const mapStateToProps = state => ({
    data: state.user_data
});

const mapDispatchToProps = dispatch => ({
    fetch_data: () => dispatch(fetch_user_data())
});

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.sideNav = React.createRef();
        this.collapsible = React.createRef();

        this.state = {
            display_name: '',
            pic_url: ''
        };
    }
    componentWillReceiveProps(np) {
        if (np.data.data != undefined) {
            const data = np.data.data.user;
            this.setState({
                display_name: data.fullName,
                pic_url: data.gravatarUrl
            });
        }
    }
    componentDidMount() {
        const sidenav = this.sideNav.current;
        const collapsible = this.collapsible.current;
        window.M.Sidenav.init(sidenav);
        window.M.Collapsible.init(collapsible);

        this.props.fetch_data();
    }
    componentWillUnmount() {
        const sidenav = this.sideNav.current;
        const instance = window.M.Sidenav.getInstance(sidenav);
        instance.destroy();
    }
    render() {
        return (
            <div>
                <nav className="admin-nav white">
                    <div className="nav-wrapper">
                        <a className="brand-logo">
                            <i className="fa fa-codiepie" />
                        </a>
                        <a
                            data-target="mobile-demo"
                            className="sidenav-trigger"
                        >
                            <i className="fa fa-bars" />
                        </a>
                        <ul className="right">
                            <li className="hide-small">
                                <a title="Notification">
                                    <i className="fa fa-bell-o" />
                                </a>
                            </li>
                        </ul>
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
                                <img
                                    className={
                                        this.props.data.data != undefined
                                            ? 'circle'
                                            : undefined
                                    }
                                    src={
                                        this.props.data.data != undefined
                                            ? this.state.pic_url
                                            : undefined
                                    }
                                />
                            </a>
                            <a>
                                <span className="name">
                                    {this.props.data.data != undefined
                                        ? this.state.display_name
                                        : ''}
                                </span>
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
    data: PropTypes.object,
    fetch_data: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
