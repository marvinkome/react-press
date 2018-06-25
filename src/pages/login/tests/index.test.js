import React from 'react';
import Login from '../index';
import { PageView } from '../view';
import { shallow } from 'enzyme';

describe('login tests', () => {
    it('renders', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders view', () => {
        const props = {
            isLoggingIn: false,
            login_user: jest.fn(),
            fetch_data: jest.fn()
        };

        const view = shallow(<PageView {...props} />);
        expect(view).toMatchSnapshot();
    });
});
