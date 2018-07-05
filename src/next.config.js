// next.config.js
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
module.exports = withLess(withCss());
