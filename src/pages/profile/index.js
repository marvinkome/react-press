import React from 'react';
import types from 'prop-types';
import { Query } from 'react-apollo';

import Error from '../../components/error';
import MainPage from '../../components/app';
import PageView from './view';
import query from './query';

import './style.less';

class Profile extends React.Component {
    static async getInitialProps({ query }) {
        return {
            user_name: decodeURIComponent(query.user)
        };
    }

    renderServerError = () => {
        return (
            <Error
                render={
                    <div className="valign-wrapper center">
                        <h5>
                            It{'\''}s not you it{'\''}s us. Please reload this page. If it persists
                            try again later. We{'\''}re really sorry.
                        </h5>
                    </div>
                }
                fullScreen
            />
        );
    };

    render() {
        const { loggedIn, user_name } = this.props;
        return (
            <Query query={query} variables={{ user_name }}>
                {({ error, data }) => {
                    if (error) return this.renderServerError();

                    const pageTitle = data.publicUser ? data.publicUser.fullName : 'User not found';
                    return (
                        <MainPage
                            loggedIn={loggedIn}
                            pageTitle={pageTitle}
                            render={() => <PageView user={data.publicUser} />}
                        />
                    );
                }}
            </Query>
        );
    }
}

Profile.propTypes = {
    loggedIn: types.bool.isRequired,
    user_name: types.string.isRequired
};

export default Profile;
