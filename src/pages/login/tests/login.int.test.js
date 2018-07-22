import React from 'react';
import wait from 'waait';
import Router from 'next/router';

import { MockedProvider } from 'react-apollo/test-utils';
import { create } from 'react-test-renderer';

import mocker from '../../../../mocks/materializeMock';

import Index from '../index';
import query from '../view/query';

import result from './query_result';

describe('Login page integration tests', () => {
    Router.replace = jest.fn();

    const mocks = {
        request: {
            query: query,
            variables: {
                email: 'john@doe.com',
                password: 'fakepassword'
            }
        },
        result
    };

    const page = async (mock) => {
        mocker('Sidenav', jest.fn());
        const page = create(
            <MockedProvider mocks={[mock]} addTypename={false}>
                <Index />
            </MockedProvider>
        );

        await wait(0);

        return page;
    };

    test('login', async () => {
        const { root } = await page(mocks);

        // set input fields
        const email = root.find((el) => el.props.placeholder === 'Your email');
        const password = root.find((el) => el.props.placeholder === 'Your password');

        email.value = 'john@doe.com';
        password.value = 'fakepassword';

        // submit form
        const form = root.find((el) => el.type === 'form');
        form.props.onSubmit({
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            target: {
                email,
                password
            }
        });

        await wait(0);

        // expect input field to be cleared
        expect(email.value).toBe('');
        expect(password.value).toBe('');

        // expect no errors
        const errorBox = root.find((el) => el.props.className === 'red-text');
        expect(errorBox.children).toHaveLength(0);
    });
});
