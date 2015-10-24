'use strict';

var webpackConfig = require('./load-webpack-config.js')();

module.exports = function() {

  return function() {
    console.log(webpackConfig.release());
    return true;
  };
};

