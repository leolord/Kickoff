// Karma configuration
// Generated on Thu Nov 19 2015 11:09:23 GMT+0800 (CST)
var pathCfg = require('./package.json').path;
var isDebug = false;
var isTest  = true;
var webpacConfig = require('./scripts/webpack/webpack-config.generator.js')(pathCfg, isDebug, isTest);

module.exports = function(config) {
  config.set({
    basePath: __dirname,
    frameworks: ['jasmine'],

    files: [
      'test/**/*.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'test/**/*.js' : ['webpack']
    },

    webpack: webpacConfig,

    webpackMiddleware: {
      noInfo: true
    },

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-webpack'
    ],

    reporters: ['html'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome', 'Firefox'],

    singleRun: false,

    concurrency: Infinity
  });
};
