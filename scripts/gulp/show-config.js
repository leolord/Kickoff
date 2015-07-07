'use strict';

module.exports = function(gulp, plugins, webpackConfig) {

  return function() {
    plugins.gutil.log(webpackConfig.release);
  };

};

