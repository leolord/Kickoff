'use strict';

/**
 * This file is for generating webpack configuration.
 * */

//Node modules
var path = require('path');
var fs = require('fs');

//webpack modules
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var defaultConfig = {
  'src': 'app',
  'dist': 'dist',
  'vendor': 'vendor'
};

/* eslint max-params:[1,4]*/
function configEntry(pathCfg, debug, configObj, ts) {
  //variables
  var modules = fs.readdirSync(pathCfg.src),
    entry = {},
    entryArray = [];

  //compute modules' entries
  modules.forEach(function(name) {
    var entryJS = ['.', pathCfg.src, name, 'index'].join(path.sep);

    if (fs.existsSync(entryJS + '.js')) {
      entryJS = entryJS + '.js';
    } else if(fs.existsSync(entryJS + '.es6.js')){
      entryJS = entryJS + '.es6.js';
    } else if (fs.existsSync(entryJS + '.jsx')) {
      entryJS = entryJS + '.jsx';
    } else {
      return;
    }

    entryArray.push(entryJS);
    entry[name] = entryJS;
  });

  configObj._entryArray = entryArray;
  configObj.entry = entry;
  configObj.output = {
    path: path.resolve(pathCfg.dist),
    publicPath: './',
    filename: '[name]/index.' + ts + '.js',
    chunkFilename: [pathCfg.vendor, '[name].' + ts + '.js'].join(path.sep)
  };
}

function configLoader(pathCfg, debug, configObj) {
  configObj.module.loaders = [{
    test: /(\.es6.js$)|(\.jsx$)/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
    query: {
      optional: ['runtime'],
      stage: 0
    }
  },
  {
    test: /\.js$/,
    exclude: [/node_modules/, /bower_components/],
    loader: 'eslint-loader'
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      'file?hash=sha512&digest=hex&name=img/[hash].[ext]',
      'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
    ]
  },
  {
    test: /\.ejs$/,
    loader: 'ejs-loader'
  },
  {
    test: /\.jade$/,
    loader: 'jade-loader'
  },
  {
    test: /\.less$/,
    loader: 'style!css!autoprefixer?browsers=last 3 version!less-loader'
  },
  {
    test: /\.css$/,
    loader: 'style!css'
  }];
}

function configPlugin(pathCfg, debug, configObj, ts){
  if(debug){
    configObj.plugins = [
      new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])), 
      new CommonsChunkPlugin('commons.' + ts + '.js')
    ];
  } else {
    configObj.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }), 
      new webpack.ResolverPlugin( new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']) ), 
      new CommonsChunkPlugin('commons.' + ts + '.js')
    ];
  }
}

function configResolve(pathCfg, debug, configObj){
  configObj.resolve = {
    alias: require('./alias.json'),
    root: ['bower_components', 'node_modules']
  };
}

//configuration
module.exports = function(_pathCfg, debug, _ts) {

  var pathCfg = _pathCfg || defaultConfig;
  var ts = _ts || Date.now();


  var configObj = {
    //这是是gulpFile需要的入口文件列表
    context: path.resolve('.'),
    module: { },

    devServer: {
      contentBase: './'
    },

    devtool: debug ? '#source-map' : false,
    debug : debug
  };

  configEntry(pathCfg, debug, configObj, ts);
  configLoader(pathCfg, debug, configObj);
  configPlugin(pathCfg, debug, configObj, ts);
  configResolve(pathCfg, debug, configObj);

  return configObj;
};

