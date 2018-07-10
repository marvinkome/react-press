/**
 * ./app/js/helpers
 */

import moment from 'moment';
import sanitize from 'sanitize-html';
import jsHttpCookie from 'cookie';
import { getFromStore } from './storage';
import { loggedInKey } from '../keys/storage';
import { isSameISOYear } from 'date-fns';

export const truncate = (word, length) => {
    const new_word =
        word
            .split(' ')
            .splice(0, length)
            .join(' ') + ' ...';
    return word.split(' ').length < length ? word : new_word;
};

export const format_date = (server_date) => {
    let date = moment.utc(server_date).format('YYYY-MM-DD HH:mm:ss');
    let stillUtc = moment.utc(date).toDate();
    const isSameYear = isSameISOYear(new Date(date).getFullYear(), new Date().getFullYear());

    if (isSameYear) {
        return moment(stillUtc)
            .local()
            .format('MMM DD');
    }

    return moment(stillUtc)
        .local()
        .format('MMM DD YYYY');
};

export const validate_password = (password) => {
    const regExp = new RegExp(
        '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    return regExp.test(password);
};

export const validate_html = (html) => {
    const regExp = /<[a-z][\s\S]*>/i;
    return regExp.test(html);
};

export const upload_file = async (file, onUpload, onFail, onSuccess) => {
    try {
        const firebase = await import('firebase');
        const ref = firebase
            .storage()
            .ref()
            .child('images/' + file.name);
        const task = ref.put(file);
        task.on(firebase.storage.TaskEvent.STATE_CHANGED, onUpload, onFail, onSuccess);
        return task;
    } catch (e) {
        return 'firebase is not defined', null;
    }
};

// greatest common divisor
export const gcd = (a, b) => {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
};

export const get_profile_link = (fullName) => {
    return '/profile/' + encodeURIComponent(fullName.toLowerCase());
};

export const sort_posts = (posts) => {
    if (posts !== undefined) {
        // posts.sort((a, b) => {
        //     if (a.timestamp > b.timestamp) {
        //         return -1;
        //     }
        //     if (a.timestamp < b.timestamp) {
        //         return 1;
        //     }
        //     return 0;
        // });
    }

    return posts;
};

export const isLoggedIn = (req) => {
    if (req && req.headers) {
        // checks if it's server
        const httpCookies = req.headers.cookie;
        if (typeof httpCookies === 'string') {
            const cookies = jsHttpCookie.parse(httpCookies);
            return cookies[loggedInKey] === 'true';
        }
    } else {
        if (typeof window !== 'undefined') {
            if (window.localStorage) {
                const sessionLogin = getFromStore(loggedInKey);

                return sessionLogin !== undefined && sessionLogin === true;
            }
        }
    }

    return false;
};

export const createToast = (text) => {
    const toastHTML = `
        <div>
            <span>
                ${text}
            </span>
        </div>
    `;
    window.M.toast({
        html: toastHTML,
        displayLength: 4000
    });
};

export const sanitize_html = (html) => {
    return sanitize(html, {
        allowedTags: ['b', 'i', 'h2', 'h3', 'pre', 'blockquote', 'ul', 'li']
    });
};

export const get_page_link = (title) => {
    return encodeURIComponent(title.toLowerCase());
};

export const isNotUndefined = (value) => {
    if (value !== null && value !== undefined) return true;
    return false;
};

export const all_tags = ['tech', 'science', 'culture', 'art', 'media'];
