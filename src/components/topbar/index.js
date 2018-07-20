import React from 'react';
import types from 'prop-types';
import { withApollo } from 'react-apollo';

import { NavBar } from './navBar';
import { SideNav } from './sideNav';
import query, { notificationQuery } from './userQuery';
import './topbar.less';

export class TopBar extends React.Component {
    constructor() {
        super();

        this.state = {
            imageClass: 'defImg',
            image: '/static/default-pic.png',
            username: 'Guest',
            notifications_data: []
        };
    }
    async componentDidMount() {
        if (this.props.isLoggedIn) {
            const { user } = await this.fetch_user_data();
            await this.fetch_notifications();

            if (user.fullName) {
                this.setState({
                    username: user.fullName
                });
            }

            if (user.gravatarUrl) {
                this.setState({
                    image: user.gravatarUrl,
                    imageClass: ''
                });
            }
        }
    }

    fetch_user_data = async () => {
        const { data } = await this.props.client.query({
            query
        });

        return data;
    };

    fetch_notifications = async () => {
        const query = await this.props.client.watchQuery({
            query: notificationQuery,
            pollInterval: 10000
        });

        query.subscribe({
            next: ({data}) => {
                const { user: { notifications: { edges } } } = data;

                if (edges.length) {
                    this.setState({
                        notifications_data: edges
                    });
                }
            }
        });

        return query;
    };

    handleLogout = async () => {};
    readNotifications = () => {};

    render() {
        const loggedIn = this.props.isLoggedIn;

        let imageClass = this.state.imageClass;
        let image = this.state.image;
        let username = this.state.username;

        const notifications_data = {
            notifications: this.state.notifications_data
        };

        const navbarProps = {
            isLoggedIn: loggedIn,
            notifications_data,
            logout: this.handleLogout,
            readNotifications: this.readNotifications,
            imageData: {
                imageClass,
                image
            }
        };

        const sidenavProps = {
            data: {
                image,
                imageClass,
                isLoggedIn: loggedIn,
                username
            },
            logout: this.handleLogout
        };

        return (
            <div className="navbar-wrapper">
                <NavBar {...navbarProps} />
                <SideNav {...sidenavProps} />
            </div>
        );
    }
}

TopBar.propTypes = {
    isLoggedIn: types.bool,
    user_data: types.object,
    notifications: types.object,
    logout: types.func,
    readNotifications: types.func,
    client: types.object.isRequired
};

export default withApollo(TopBar);
