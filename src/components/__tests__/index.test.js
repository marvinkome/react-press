import React from 'react';
import { renderRoot } from './test-utils';
import { ConnectApp } from '../app';
import { fetch_data_mock } from '../../../__mocks__/apiMocks.js';
import 'materialize-css/dist/js/materialize.js';

describe('Integration tests', () => {
    const { container } = renderRoot(<ConnectApp/>);

    beforeEach(() => {
        fetch.resetMocks();
    });

    it('renders homepage', () => {
        fetch.mockResponse(JSON.stringify(fetch_data_mock));
        expect(container).toMatchSnapshot();
    });

    // it('is routes to login on click', () => {

    // });
});