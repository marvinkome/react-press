/**
 * ./app/js/helpers
 */

import moment from 'moment';

export const truncate = (word, length) =>
    word
        .split(' ')
        .splice(0, length)
        .join(' ');

export const format_date = server_date => {
    let date = new Date(server_date);
    return moment(date).format('MMM D YYYY');
};

export const validate_password = password => {
    const regExp = new RegExp(
        '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    return regExp.test(password);
};
