/**
 * ./app/js/helpers
 */

import moment from 'moment';

export const truncate = (word, length) =>
    word
        .split(' ')
        .splice(0, length)
        .join(' ') + ' ....';

export const format_date = server_date => {
    let date = moment.utc(server_date).format('YYYY-MM-DD HH:mm:ss');
    let stillUtc = moment.utc(date).toDate();

    if (
        new Date(date).getFullYear() == new Date().getFullYear() &&
        moment(stillUtc)
            .local()
            .week() !==
            moment(stillUtc)
                .local()
                .week()
    ) {
        return moment(stillUtc)
            .local()
            .format('MMM DD');
    } else if (
        moment(stillUtc)
            .local()
            .week() ==
        moment(stillUtc)
            .local()
            .week()
    ) {
        return moment(stillUtc)
            .local()
            .fromNow();
    }

    return moment(stillUtc)
        .local()
        .format('MMM DD [\']YY');
};

export const validate_password = password => {
    const regExp = new RegExp(
        '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    return regExp.test(password);
};

export const validate_html = html => {
    const regExp = /<[a-z][\s\S]*>/i;
    return regExp.test(html);
};

export const strip_filename = name => {
    return name.split('/').pop();
};

export const upload_file = file => {
    const url =
        process.env.NODE_ENV == 'production'
            ? 'https://reactpress-api.herokuapp.com'
            : 'http://0.0.0.0:5000';
    const formData = new FormData();
    formData.append('file', file);

    const headers = {
        method: 'POST',
        body: formData
    };

    return fetch(url, headers).then(res => res.json());
};

export const gcd = (a, b) => {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
};

export const count_words_in_html = string => {
    string = string.replace(/<(?:.|\n)*?>/gm, '');
    string = string.replace(/(^\s*)|(\s*$)/gi, '');
    string = string.replace(/[ ]{2,}/gi, ' ');
    string = string.replace(/\n /, '\n');
    return string.split(' ').length;
};

export const getCookie = cname => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

export const deleteCookie = () => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf('=');
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
};
