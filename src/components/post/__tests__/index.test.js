import React from 'react';
import {shallow} from 'enzyme';
import PostPage from '../index';

describe('post page index tests', () => {
    it('renders correctly', () => {
        const match = {
            params: {
                id: ''
            }
        };
        const wrapper = shallow(<PostPage match={match}/>);

        expect(wrapper).toMatchSnapshot();
    });
});