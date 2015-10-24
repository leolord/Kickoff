'use strict';

var pathCfg             = require('../../../package.json').path;
var webpack             = require('webpack');
var webpackCfgGenerator = require('../../webpack/webpack-config.generator.js');
var WebpackServer       = require('webpack-dev-server');

module.exports = function(){

  return function(){
    var cfg = webpackCfgGenerator(pathCfg, true);
    var compiler = webpack(cfg);

    new WebpackServer(compiler, cfg.devServer).listen(8080, '127.0.0.1', function(err) {

      if(err) {
        throw new Error('webpack-dev-server', err);
      }

      console.log('[webpack-dev-server]', 'http://127.0.0.1:8080/');

    });
  };
};
