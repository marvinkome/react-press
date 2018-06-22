import React from 'react';
import { shallow } from 'enzyme';

import Home from '../index';
import { View } from '../view';
import { Body } from '../view/body';

describe('home page tests', () => {
    test('it renders correctly', () => {
        const wrapper = shallow(<Home />);

        expect(wrapper).toMatchSnapshot();
    });
});

describe('view component test', () => {
    test('view component renders correctly', () => {
        const wrapper = shallow(<View user_data={{}} />);

        expect(wrapper).toMatchSnapshot();
    });
});

describe('body component test', () => {
    const fetch_more = jest.fn();

    const props = {
        posts: [],
        hasMore: false,
        cursor: '',
        fetch_more
    };

    test('renders correctly', () => {
        const wrapper = shallow(<Body {...props} fetching={false} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('it shows preloader when fetching', () => {
        const wrapper = shallow(<Body {...props} fetching={true} />);
        expect(wrapper).toMatchSnapshot();
    });
});
