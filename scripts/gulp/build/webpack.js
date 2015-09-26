'use strict';

//var pathCfg = require('../../../package.json').path;
//var path = require('path');

module.exports = function(gulp, plugins, webpackConfig){
  return function(cb){
    var cfg = webpackConfig.release();
    plugins.webpackCli(cfg, function(err, stats){

      if(err) console.error('Webpack Error: ', err);

      console.log('[webpack]', stats.toString({
        colors: true
      }));
      cb();
    });
  };
};
