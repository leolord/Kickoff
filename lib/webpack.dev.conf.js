'use strict';

var path = require('path');
var config = require(path.resolve(__dirname, './webpack.base.conf'));
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

config.devtool = 'eval-source-map';
config.output.publicPath = '/dist/app';

//for (var entryName in config.entry) {
  //if (config.entry.hasOwnProperty(entryName)) {
    //config.entry[entryName] = [
      //config.entry[entryName],
      //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    //];
  //}
//}

config.plugins = (config.plugins || []).concat([
  new ExtractTextPlugin('[name].css'),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin()
]);

module.exports = config;
