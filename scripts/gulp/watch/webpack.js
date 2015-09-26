'use strict';

module.exports = function(gulp, plugins, webpackConfig){

  return function(){
    var cfg = webpackConfig.debug();
    var compiler = plugins.webpackCli(cfg);

    new plugins.WebpackDevServer(compiler, cfg.devServer).listen(8080, '127.0.0.1', function(err) {

      if(err) {
        throw new Error('webpack-dev-server', err);
      }

      console.log('[webpack-dev-server]', 'http://127.0.0.1:8080/');

    });
  };
};
