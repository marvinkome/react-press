import React from 'react';
import SignUp from '../index';
import { PageView } from '../view';
import { shallow } from 'enzyme';

describe('signup tests', () => {
    it('renders', () => {
        const wrapper = shallow(<SignUp />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders view', () => {
        const props = {
            isLoggingIn: false,
            register_user: jest.fn(),
            fetch_data: jest.fn()
        };

        const view = shallow(<PageView {...props} />);
        expect(view).toMatchSnapshot();
    });
});
