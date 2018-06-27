import React from 'react';
import { Post } from '../index';
import { PageBody } from '../view';
import PostBody from '../view/body';
import AuthorInfo from '../view/author-info';
import PostCard from '../view/post-card';
import { shallow } from 'enzyme';
import { fetch_data_mock } from '../../../../mocks/apiMocks';

describe('body tests', () => {
    const clap = jest.fn();
    const onClap = jest.fn();

    it('renders', () => {
        const posts = fetch_data_mock.data.allPost.edges;
        const wrapper = shallow(<Post posts={posts} post_id={'UG9zdDox'} loggedIn={false} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders view', () => {
        const post = fetch_data_mock.data.allPost.edges[0];
        const view = shallow(<PageBody post={post} loggedIn={false} user_data={{}} clap={clap} />);
        expect(view).toMatchSnapshot();
    });

    it('renders post body', () => {
        const post = fetch_data_mock.data.allPost.edges[0];
        const wrapper = shallow(<PostBody post={post} onClap={onClap} />);
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
