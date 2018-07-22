import React from 'react';
import { shallow } from 'enzyme';

import Index from '../index';
import View from '../view';
import PostCard from '../view/post-card';

import result from './query_result';

describe('index page unit tests', () => {
    it('renders', () => {
        const wrapper = shallow(<Index loggedIn={false} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders view', () => {
        const view = shallow(<View />);
        expect(view).toMatchSnapshot();
    });

    it('renders post card', () => {
        const post = result.data.allPost.edges[0].node;
        const card = shallow(<PostCard post={post} />);
        expect(card).toMatchSnapshot();
    });
});
