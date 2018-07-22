import React from 'react';
import { shallow } from 'enzyme';
import Index from '../index';
import View from '../view';

describe('login page unit tests', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Index />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const wrapper = shallow(<View />);
        expect(wrapper).toMatchSnapshot();
    });
});
