import React from 'react';
import { Provider } from 'react-redux';
import Topbar from './helpers/topbar';
import store from '../js/redux/store';
import 'materialize-css/dist/css/materialize.min.css';
if (typeof window !== 'undefined') { require('materialize-css/dist/js/materialize.js'); }
import '../style/index.less';

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
                        <Page />
                    </div>
                );
            }
        }
    );
};

export default (Page) => withTopbar(Page);
