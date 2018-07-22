import React from 'react';
import wait from 'waait';

import { MockedProvider } from 'react-apollo/test-utils';
import { render } from 'react-testing-library';

import mocker from '../../../../mocks/materializeMock';

import Index from '../index';
import query from '../view/query';

import result from './query_result';

describe('Homepage integration tests', () => {
    const mocks = {
        request: {
            query: query,
            variables: {
                first: 6
            }
        },
        result
    };

    const getTitles = (nodes) => {
        let titles = [];
        nodes.forEach((node) => {
            titles = titles.concat(node.text);
        });

        return titles;
    };

    const page = async (mock) => {
        mocker('Sidenav', jest.fn());
        const page = render(
            <MockedProvider mocks={[mock]} addTypename={false}>
                <Index loggedIn={false} />
            </MockedProvider>
        );

        await wait(0);

        return page;
    };

    it('render all titles', async () => {
        const { container } = await page(mocks);
        const postNode = container.querySelectorAll('a.post-card__title--link');

        const postTitles = getTitles(postNode);

        expect(postNode).toHaveLength(6);
        expect(postTitles).toEqual([
            'Bio: Andy Bernard',
            'Test Markdown styles',
            'Refactor bug',
            'Hello New World',
            'Hello World',
            'Quam non nam?'
        ]);
        expect(container).toMatchSnapshot();
    });

    test('error state', async () => {
        const mock = {
            ...mocks,
            error: new Error('aw shucks')
        };

        const { container } = await page(mock);
        const errorNode = container.querySelector('div.error p');

        expect(errorNode.textContent).toContain('Error fetching posts');
    });
});
