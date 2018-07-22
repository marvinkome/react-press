import React from 'react';
import types from 'prop-types';
import { withApollo, Mutation } from 'react-apollo';

import { logout } from '../../lib/helpers';
import { NavBar } from './navBar';
import { SideNav } from './sideNav';
import query, { notificationQuery, readNotificationMutation } from './userQuery';
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
            this.notifcationPoll = await this.fetch_notifications();

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
        const query = this.props.client.watchQuery({
            query: notificationQuery,
            pollInterval: 10000
        });

        query.subscribe({
            next: ({ data }) => {
                const {
                    user: {
                        notifications: { edges }
                    }
                } = data;

                if (edges.length) {
                    this.setState({
                        notifications_data: edges
                    });
                }
            }
        });

        return query;
    };

    handleLogout = async () => {
        // stop polling
        if (this.notifcationPoll) this.notifcationPoll.stopPolling();

        // check if it's admin
        const index = window.location.href.indexOf('/me/');

        if (index === -1) {
            // is not admin
            logout();
            window.location.href = window.location.href;
        } else {
            // is admin
            // first move to a safe area
            // then reload to send new props to the page
            window.location.href = '/';
            logout();
        }
        this.props.client.resetStore();
    };

    render() {
        const { isLoggedIn: loggedIn, client } = this.props;

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
            <Mutation mutation={readNotificationMutation} onCompleted={() => client.resetStore()}>
                {(readNotifications) => {
                    return (
                        <div className="navbar-wrapper">
                            <NavBar {...navbarProps} readNotifications={readNotifications} />
                            <SideNav {...sidenavProps} />
                        </div>
                    );
                }}
            </Mutation>
        );
    }
}

TopBar.propTypes = {
    isLoggedIn: types.bool,
    user_data: types.object,
    notifications: types.object,
    logout: types.func,
    readNotifications: types.func,
    client: types.object
};

export default withApollo(TopBar);
