'use strict';

module.exports = function(gulp, plugins, webpackConfig) {

  return function() {
    console.log(webpackConfig.release());
  };

};

