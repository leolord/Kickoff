'use strict';

var pathCfg = require('../../../package.json').path;

module.exports = function(gulp, plugins, webpackConfig){

  return function(){
    var cfg = webpackConfig.debug();
    var compiler = plugins.webpackCli(cfg);

    new plugins.WebpackDevServer(compiler, {
      contentBase  : pathCfg.dist,
      publicPath   : pathCfg.dist,
      quiet        : false,
      noInfo       : true,
      inline       : true,
      stats        : { colors : true }
    }).listen(8080, 'localhost', function(err) {

      if(err) {
        throw new Error('webpack-dev-server', err);
      }

      console.log('[webpack-dev-server]', 'http://127.0.0.1:8080/');

    });
  };
};
