const env = process.env.NODE_ENV;
const prod_url = 'https://reactpress-api.herokuapp.com';
const dev_url = 'http://127.0.0.1:5000';

export const tokenKey = 'user_session_token';
export const url = env == 'production' ? prod_url : dev_url;
