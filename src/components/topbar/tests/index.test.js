import React from 'react';
import { shallow } from 'enzyme';

import { TopBar } from '../index';
import { NavBar } from '../navBar';
import NotificationsMenu from '../notificationMenu';
import Notifications from '../Notifications';

describe('topbar tests', () => {
    const logout = jest.fn();
    const readNotifications = jest.fn();
    const topbarProps = {
        isLoggedIn: false,
        isHomePage: false,
        user_data: {
            user: {}
        },
        notifications: {},
        logout,
        readNotifications
    };

    it('renders', () => {
        const wrapper = shallow(<TopBar {...topbarProps} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders navbar', () => {
        const props = {
            isLoggedIn: false,
            imageData: {},
            notifications_data: {},
            logout,
            readNotifications
        };

        const wrapper = shallow(<NavBar {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders notifications menu', () => {
        const props = {
            isLoggedIn: false,
            notifications_data: {},
            readNotifications
        };

        const wrapper = shallow(<NotificationsMenu {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders notifications', () => {
        const props = {
            notifications: []
        };

        const wrapper = shallow(<Notifications {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
