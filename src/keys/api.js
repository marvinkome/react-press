export const url =
    process.env.NODE_ENV == 'production'
        ? 'https://reactpress-api.herokuapp.com'
        : 'http://127.0.0.1:5000';
