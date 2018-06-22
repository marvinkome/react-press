import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import default_store from '../../js/redux/store';

export function renderWithRouter(
    ui,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
    return {
        ...render(<Router>{ui}</Router>),
        history
    };
}

export function renderRoot(
    ui,
    { store = default_store } = {},
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
    return {
        ...render(
            <Provider store={store}>
                <Router history={history}>{ui}</Router>
            </Provider>
        ),
        store,
        history
    };
}
