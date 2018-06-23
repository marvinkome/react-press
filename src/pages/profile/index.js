import React from 'react';
import types from 'prop-types';
import { fetch_profile_data } from '../../store/actions';
import Error from '../../components/error';
import PageView from './view';
import './style.less';

class Profile extends React.Component {
    static async getInitialProps({ query, store }) {
        // Get the username and id from url
        const user_name_list = query.user.split('_');
        const user_name = user_name_list.slice(0, user_name_list.length - 1).join('_');
        const user_id = user_name_list.slice(user_name_list.length - 1).join('_');

        const users = store.getState().public_users.users;
        const profile = users.find((obj) => obj.id == user_id);

        if (profile === undefined) {
            try {
                await store.dispatch(fetch_profile_data(user_name));
                const users = store.getState().public_users.users;
                const profile = users.find((obj) => obj.id == user_id);
                return { profile };
            } catch (e) {
                console.error(e); // eslint-disable-line
                return {
                    error: true
                };
            }
        } else {
            return { profile };
        }
    }
    render() {
        const { profile, error } = this.props;
        if (error) {
            return (
                <Error
                    render={
                        <div className="valign-wrapper center">
                            <h5>
                                It{'\''}s not you it{'\''}s us. Please reload this page. If it
                                persists try again later. We{'\''}re really sorry.
                            </h5>
                        </div>
                    }
                    fullScreen
                />
            );
        } else {
            return <PageView user={profile} />;
        }
    }
}

Profile.propTypes = {
    profile: types.object,
    error: types.bool
};

export default Profile;
