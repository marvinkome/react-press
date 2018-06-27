import React from 'react';
import { Index } from '../index';
import View from '../view';
import PostCard from '../view/post-card';
import { shallow } from 'enzyme';
import { fetch_data_mock } from '../../../../mocks/apiMocks';

describe('home tests', () => {
    it('renders', () => {
        const posts = fetch_data_mock.data.allPost.edges;
        const wrapper = shallow(<Index posts={posts} loggedIn={false}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders view', () => {
        const posts = fetch_data_mock.data.allPost.edges;
        const view = shallow(<View posts={posts} />);
        expect(view).toMatchSnapshot();
    });

    it('renders post card', () => {
        const post = fetch_data_mock.data.allPost.edges[0].node;
        const card = shallow(<PostCard post={post} />);
        expect(card).toMatchSnapshot();
    });
});
