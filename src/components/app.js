import React from 'react';
import { Provider } from 'react-redux';
import Topbar from './topbar';
import store from '../store';

import 'materialize-css/dist/css/materialize.min.css';
import '../style/index.less';
if (typeof window !== 'undefined') { require('materialize-css/dist/js/materialize.js'); }

export const withProvider = (Page) => {
    return (
        class PageWrapper extends React.Component {
            render(){
                return (
                    <Provider store={store}>
                        <Page />
                    </Provider>
                );
            }
        }
    );
};

export const withTopbar = (Page) => {
    return (
        class Wrapper extends React.Component {
            render(){
                return (
                    <div>
                        <Topbar />
                        <Page {...this.props} />
                    </div>
                );
            }
        }
    );
};

export default (Page) => withTopbar(Page);
