'use strict';

var path = require('path');
var webpackConf = require(path.resolve(__dirname, './webpack.base.conf'));
delete webpackConf.entry;

module.exports = function(config){
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['spec'],
    files: ['./test/unit/index.js'],
    preprocessors: {
      './test/unit/index.js': ['webpack']
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
