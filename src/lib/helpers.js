/**
 * ./app/js/helpers
 */

import moment from 'moment';
import sanitize from 'sanitize-html';

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

export const strip_filename = (name) => {
    return name.split('/').pop();
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

export const count_words_in_html = (string) => {
    string = string.replace(/<(?:.|\n)*?>/gm, '');
    string = string.replace(/(^\s*)|(\s*$)/gi, '');
    string = string.replace(/[ ]{2,}/gi, ' ');
    string = string.replace(/\n /, '\n');
    return string.split(' ').length;
};

export const get_profile_link = (fullName, id) => {
    fullName = fullName.toLowerCase();
    let link_list = fullName.split(' ');
    link_list = link_list.concat(id);

    return '/profile/' + link_list.join('_');
};

export const sort_posts = (posts) => {
    if (posts !== undefined) {
        posts.sort((a, b) => {
            if (a.node.timestamp > b.node.timestamp) {
                return -1;
            }
            if (a.node.timestamp < b.node.timestamp) {
                return 1;
            }
            return 0;
        });
    }

    return posts;
};

export const isLoggedIn = () => {
    const sessionLogin = JSON.parse(localStorage.getItem('med-blog-logged-in'));
    const localLogin = sessionLogin != undefined && sessionLogin == true;

    return localLogin;
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

export const get_page_link = (title, id) => {
    return `${title.split(' ').join('-').toLowerCase()}-${id}`;
};

export const all_tags = ['tech', 'science', 'culture', 'art', 'media'];

export const setPageTitle = (page) => (document.title = `${page} - React Press`);
