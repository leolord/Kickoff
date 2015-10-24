'use strict';

var pathCfg = require('../../package.json').path;
var webpackCfgGenerator = require('../webpack/webpack-config.generator.js');

module.exports = function() {

  return function() {
    console.log(webpackCfgGenerator(pathCfg, true));
    return true;
  };
};

