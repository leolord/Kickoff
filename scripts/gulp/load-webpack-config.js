'use strict';

var webpackCfgGenerator  = require('../webpack/webpack-config.generator.js');

var pathCfg = require('../../package.json').path;

module.exports = function(){
  return {
    debug   : function(){
      return webpackCfgGenerator(pathCfg, true);
    },
    release : function(){
      return webpackCfgGenerator(pathCfg, false);
    }
  };
};

