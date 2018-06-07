import React from 'react';
import { shallow } from 'enzyme';

import { TopBar, Dropdown } from '../topbar';

describe('topbar tests', () => {
    const logout = jest.fn();
    const user_data = {
        user: {}
    };

    it('renders correctly when logged out', () => {
        const wrapper = shallow(<TopBar user_data={null} logout={logout} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when logged in', () => {
        const wrapper = shallow(<TopBar user_data={user_data} logout={logout} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('dropdown opens on user image click', () => {
        const wrapper = shallow(<TopBar user_data={user_data} logout={logout} />);
        wrapper.find('.user-profile').simulate('click');
        expect(wrapper).toMatchSnapshot();
    });

    it('logout is called when clicked', () => {
        const wrapper = shallow(<Dropdown handleLogout={logout} />);
        wrapper.find('.logout').simulate('click');
        expect(logout).toBeCalled();
    });
});
