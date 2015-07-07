/**
 * this task depends build:less
 * */
'use strict';

var pathCfg = require('../../../package.json').path;
var path    = require('path');

module.exports = function(gulp, plugins, webpackConfig){

  return function(){
    var cfg = webpackConfig.debug;
    var compiler = plugins.webpackCli(cfg);

    new plugins.WebpackDevServer(compiler, {
      publicPath: ['', pathCfg.dist].join(path.sep),
      quiet: true
    }).listen(8080, 'localhost', function(err) {

      if(err) {
        throw new plugins.gutil.PluginError('webpack-dev-server', err);
      }

      plugins.gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/');

    });
  };
};
