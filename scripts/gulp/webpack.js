'use strict';

var webpack = require('webpack');
var webpackConfig = require('./load-webpack-config.js')();

module.exports = function(){
  return function(cb){
    var cfg = webpackConfig.release();
    webpack(cfg, function(err){

      if(err) console.error('Webpack Error: ', err);

      cb();
    });
  };
};
