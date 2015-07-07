'use strict';

var webpackCfgGenerator  = require('../webpack/webpack-config.generator.js');

var pathCfg = require('../../package.json').path;

module.exports = function(ts){
  return {
    debug   : webpackCfgGenerator(pathCfg, true, ts),
    release : webpackCfgGenerator(pathCfg, false, ts)
  };
};

