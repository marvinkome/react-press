import React from 'react';
import { shallow } from 'enzyme';

import { TopBar } from '../topbar';
import { NavBar } from '../topbar/navBar';

describe('topbar tests', () => {
    const logout = jest.fn();
    const readNotifications = jest.fn();
    const topbarProps = {
        isPostPage: false,
        user_data: {
            user: {}
        },
        notifications: {},
        logout,
        readNotifications
    };

    it('renders correctly when logged out', () => {
        const wrapper = shallow(<TopBar {...topbarProps} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when logged in', () => {
        const wrapper = shallow(<TopBar {...topbarProps} />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('nav bar unit tests', () => {
    const logout = jest.fn();
    const readNotifications = jest.fn();
    const Props = {
        isLoggedIn: false,
        isHomePage: false,
        stick: false,
        imageData: {
            image: '',
            imageClass: ''
        },
        user_data: {
            user: {}
        },
        notifications_data: {
            notifications: [],
            unread_count: 0
        },
        logout,
        readNotifications
    };

    it('renders', () => {
        const wrapper = shallow(<NavBar {...Props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('shows nav menu only on homepage', () => {
        const props = {
            ...Props,
            isHomePage: true
        };
        const wrapper = shallow(<NavBar {...props} />);
        expect(wrapper.find('.nav-content')).toHaveLength(1);
    });
});
