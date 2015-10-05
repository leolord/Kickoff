'use strict';

/**
 * This file is for generating webpack configuration.
 * */

//Node modules
var path = require('path');
var find = require('find');

//webpack modules
var webpack = require('webpack');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var defaultConfig = {
  'src': 'app',
  'dist': 'dist',
  'vendor': 'vendor'
};

/* eslint max-params:[1,4]*/
function configEntry(pathCfg, debug, configObj) {
  //variables
  var entry = {},
    entryArray = [];

  var files = find.fileSync(/index.(es6\.)?jsx?$/, pathCfg.src);

  files.forEach(function(_filePath){

    var relativePath = path.relative(pathCfg.src, _filePath);
    var absolutePath = path.resolve(_filePath);
    var fileDirs = path.dirname(relativePath);

    if(fileDirs.indexOf(path.sep) === -1){
      entryArray.push(absolutePath);
      if(debug) {
        entry[fileDirs] = [
          //'webpack-dev-server?http://127.0.0.1:8080',
          'webpack/hot/dev-server',
          absolutePath
        ];
      } else {
        entry[fileDirs] = absolutePath;
      }
    }
  });

  configObj._entryArray = entryArray;
  configObj.entry = entry;
  configObj.output = {
    path: path.resolve(pathCfg.dist),
    publicPath: './',
    filename: debug ? '[name]/index.js' : '[name]/index.[chunkhash].js',
    chunkFilename: [pathCfg.vendor, debug ? '[name].js' : '[name].[chunkhash].js'].join(path.sep)
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
    test: /\.jade$/,
    loader: 'jade-loader'
  },
  {
    test: /\.scss$/,
    loader: 'style!css!sass?includePaths[]='
              + encodeURIComponent(path.resolve(__dirname, '../../node_modules/'))
  },
  {
    test: /\.sass$/,
    loader: 'style!css!sass?indentedSyntax&includePaths[]='
              + encodeURIComponent(path.resolve(__dirname, '../../node_modules/'))
  },
  {
    test: /\.css$/,
    loader: 'style!css'
  }];
}

function configPlugin(pathCfg, debug, configObj){
  if(debug){
    configObj.plugins = [
      //new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])),
      new CommonsChunkPlugin('commons.js'),
      new webpack.HotModuleReplacementPlugin()
    ];
  } else {
    configObj.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }), 
      //new webpack.ResolverPlugin( new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main']) ),
      new CommonsChunkPlugin({
        filename: 'commons.[hash].js',
        minChunks: 3
      })
    ];
  }
}

function configResolve(pathCfg, debug, configObj){
  configObj.resolve = {
    alias: require('./alias.json'),
    root: ['bower_components', 'node_modules'],
    extensions: ['', '.js', '.es6.js', '.jsx']
  };
}

//configuration
module.exports = function(_pathCfg, debug) {

  var pathCfg = _pathCfg || defaultConfig;

  var configObj = {
    //context: path.resolve('.'),
    
    module: { },

    devServer: {
      contentBase  : '.',
      publicPath   : ['', pathCfg.dist].join(path.sep),
      hot          : true,
      quiet        : false,
      noInfo       : true,
      stats        : { colors : true }
    },

    devtool: debug ? '#source-map' : false,
    debug : debug
  };

  configEntry(pathCfg, debug, configObj);
  configLoader(pathCfg, debug, configObj);
  configPlugin(pathCfg, debug, configObj);
  configResolve(pathCfg, debug, configObj);

  return configObj;
};

