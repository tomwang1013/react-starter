const merge = require('webpack-merge');
module.exports = merge(require('./webpack-base'), require('./common-dev'));
