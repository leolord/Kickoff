'use strict';

var pathCfg             = require('../../../package.json').path;
//var webpackServer       = require('webpack-dev-server');
var webpack             = require('webpack');
var webpackCfgGenerator = require('../../webpack/webpack-config.generator.js');

module.exports = function(){
  return function(cb){
    var cfg = webpackCfgGenerator(pathCfg, false);
    webpack(cfg, function(err){
      if(err) console.error('Webpack Error: ', err);
      cb();
    });
  };
};
