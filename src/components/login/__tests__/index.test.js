import React from 'react';
import { shallow } from 'enzyme';

import AuthPage from '../index';
import View from '../view';
import { Login } from '../view/login';
import { SignUp } from '../view/signup';

describe('auth tests renders', () => {
    it('renders page correctly', () => {
        const props = {
            match: {
                params: {
                    section: ''
                }
            }
        };

        const wrapper = shallow(<AuthPage {...props}/>);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders view correctly on login page', () => {
        const props = {
            section: 'login',
            history: {}
        };

        const wrapper = shallow(<View {...props}/>);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders view correctly on signup page section', () => {
        const props = {
            section: 'signup',
            history: {}
        };

        const wrapper = shallow(<View {...props}/>);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders view correctly on false page section', () => {
        const props = {
            section: 'error',
            history: {}
        };

        const wrapper = shallow(<View {...props}/>);

        expect(wrapper).toMatchSnapshot();
    });
});

describe('Login tests', () => {
    const props = {
        login_user: jest.fn(),
        isLoggingIn: false,
        fetch_data: jest.fn(),
        history: {
            goBack: jest.fn()
        }
    };
    const wrapper = shallow(<Login {...props}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('logs user in', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault: jest.fn()
        });
        expect(props.login_user).toBeCalled();
    });
});

describe('Signup tests', () => {
    const props = {
        register_user: jest.fn(),
        isLoggingIn: false,
        fetch_data: jest.fn(),
        history: {
            goBack: jest.fn()
        }
    };
    const wrapper = shallow(<SignUp {...props}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('make button disabled if password is not set', () => {
        expect(wrapper.find('[type="password"]').hasClass('invalid')).toEqual(true);
        expect(wrapper.find('button').hasClass('disabled')).toEqual(true);
    });

    it('register user in', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault: jest.fn()
        });
        expect(props.register_user).toBeCalled();
    });
});