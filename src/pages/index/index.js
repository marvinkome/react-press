import React from 'react';
import types from 'prop-types';
import MainPage from '../../components/app';
import Body from './view/index';
import './home.less';

export const Index = (props) => {
    return (
        <MainPage
            loggedIn={props.loggedIn}
            pageTitle="Homepage"
            render={() => (
                <Body />
            )}
        />
    );
};

Index.propTypes = {
    loggedIn: types.bool.isRequired,
};

export default Index;
