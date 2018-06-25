import React from 'react';
import Topbar from './topbar';

export const withTopbar = (Page) => {
    return class Wrapper extends React.Component {
        render() {
            return (
                <div>
                    <Topbar />
                    <Page {...this.props} />
                </div>
            );
        }
    };
};

export default (Page) => withTopbar(Page);
