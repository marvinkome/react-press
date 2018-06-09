import React from 'react';
import { shallow } from 'enzyme';

import { TopBar } from '../topbar';
import { NavBar } from '../topbar/navBar';

describe('topbar tests', () => {
    const logout = jest.fn();
    const readNotifications = jest.fn();
    const topbarProps = {
        isPostPage: false,
        user_data:{
            user: {}
        },
        notifications: {},
        logout,
        readNotifications,
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
        isPostPage: false,
        stick: false,
        imageData: {
            image: '',
            imageClass: ''
        },
        user_data:{
            user: {}
        },
        notifications_data: {
            notifications: [],
            unread_count: 0
        },
        logout,
        readNotifications,
    };

    it('renders', () => {
        const wrapper = shallow(<NavBar {...Props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('shows user navbar when loggedin', () => {
        const props = {
            ...Props,
            isLoggedIn: true
        };
        const wrapper = shallow(<NavBar {...props}/>);
        expect(wrapper.find('[data-target="dropdown-menu"]')).toHaveLength(1);
        expect(wrapper.find('[data-target="notifications-menu"]')).toHaveLength(1);
        expect(wrapper.find('.sign-up')).toHaveLength(0);
        expect(wrapper.find('.sign-in')).toHaveLength(0);
    });

    it('shows user navbar when loggedin', () => {
        const wrapper = shallow(<NavBar {...Props}/>);
        expect(wrapper.find('[data-target="dropdown-menu"]')).toHaveLength(0);
        expect(wrapper.find('[data-target="notifications-menu"]')).toHaveLength(0);
        expect(wrapper.find('.sign-up')).toHaveLength(1);
        expect(wrapper.find('.sign-in')).toHaveLength(1);
    });
});
