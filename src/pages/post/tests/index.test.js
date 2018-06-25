import React from 'react';
import { Post } from '../index';
import View from '../view';
import PostBody from '../view/body';
import AuthorInfo from '../view/author-info';
import PostCard from '../view/post-card';
import { shallow } from 'enzyme';
import { fetch_data_mock } from '../../../../mocks/apiMocks';

describe('body tests', () => {
    it('renders', () => {
        const posts = fetch_data_mock.data.allPost.edges;
        const wrapper = shallow(<Post posts={posts} post_id={'UG9zdDox'} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders view', () => {
        const post = fetch_data_mock.data.allPost.edges[0];
        const view = shallow(<View post={post} />);
        expect(view).toMatchSnapshot();
    });

    it('renders post body', () => {
        const post = fetch_data_mock.data.allPost.edges[0];
        const wrapper = shallow(<PostBody post={post} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders author info', () => {
        const post = fetch_data_mock.data.allPost.edges[0].node;
        const wrapper = shallow(<AuthorInfo data={post} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders post wrapper', () => {
        const post = fetch_data_mock.data.allPost.edges[0].node;
        const wrapper = shallow(<PostCard data={post} />);
        expect(wrapper).toMatchSnapshot();
    });
});
