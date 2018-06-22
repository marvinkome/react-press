import React from 'react';
import { shallow } from 'enzyme';

import PostPage from '../index';
import { View } from '../view';
import { Body } from '../view/body';

describe('post page index tests', () => {
    const post_page_props = {
        match: {
            params: {
                id: ''
            }
        }
    };

    const body_props = {
        post_id: '',
        user: {},
        posts: [],
        fetching: true,
        clap: jest.fn(),
        comment: jest.fn(),
        reply_comment: jest.fn(),
        page_viewed: jest.fn()
    };

    it('renders correctly', () => {
        const wrapper = shallow(<PostPage {...post_page_props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders view correctly', () => {
        const wrapper = shallow(<View user_data={{ user: {} }} id="" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders body correctly when fetching', () => {
        const wrapper = shallow(<Body {...body_props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders body correctly when not fetching', () => {
        const props = { ...body_props, fetching: false };

        const wrapper = shallow(<Body {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('renders comment correctly', () => {});
});
