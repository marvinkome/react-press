import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from '../login';

describe('forms tests', () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const props = {
        onSubmit,
        onChange,
        loggingIn: false,
        auth_message: '',
        emailValue: '',
        passwordValue: ''
    };

    it('renders', () => {
        const wrapper = shallow(<LoginForm {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
