import React from 'react';
import { shallow } from 'enzyme';
import { Body } from '../editorComponent/body';

describe('editor tests', () => {
    it('renders correctly on new post page', () => {
        const create_post = jest.fn();
        const create_tag = jest.fn();
        const props = {
            data: {},
            create_post,
            create_tag
        };
        const wrapper = shallow(<Body {...props} />);

        expect(wrapper).toMatchSnapshot();
    });
});
