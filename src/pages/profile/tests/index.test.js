import React from 'react';
import Profile from '../index';
import View from '../view';
import { shallow } from 'enzyme';

describe('home tests', () => {
    it('renders', () => {
        const wrapper = shallow(<Profile profile={{}} error={false} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders view with error', () => {
        const view = shallow(<View user={undefined} />);
        expect(view).toMatchSnapshot();
    });
});
