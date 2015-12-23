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
function configEntry(pathCfg, configObj, isDebug, isTest) {
  //variables
  var entry = {},
    entryArray = [],
    srcPath, files;

  if(isTest){
    srcPath = pathCfg.test;
    files = find.fileSync(/.jsx?$/, srcPath);
  } else {
    srcPath = pathCfg.src;
    files = find.fileSync(/index.(es6\.)?jsx?$/, srcPath);
  }

  files.forEach(function(_filePath){

    var relativePath = path.relative(srcPath, _filePath);
    var absolutePath = path.resolve(_filePath);
    var fileDirs = path.dirname(relativePath);

    if(fileDirs.indexOf(path.sep) === -1){
      entryArray.push(absolutePath);
      if(isDebug) {
        entry[fileDirs] = [
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
    filename: isDebug ? '[name]/index.js' : '[name]/index.[chunkhash].js',
    chunkFilename: [pathCfg.vendor, isDebug ? '[name].js' : '[name].[chunkhash].js'].join(path.sep)
  };
}

function configLoader(pathCfg, configObj) {
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

function configPlugin(pathCfg, configObj, isDebug, isTest){
  if(isDebug){
    configObj.plugins = [
      new webpack.HotModuleReplacementPlugin()
    ];

    if(!isTest){
      configObj.plugins.push(new CommonsChunkPlugin('commons.js'));
    }
  } else {
    configObj.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ];

    if(!isTest){
      configObj.plugins.push(new CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons.[hash].js',
        minChunks: 3
      }));
    }
  }
}

function configResolve(pathCfg, configObj){
  configObj.resolve = {
    alias: require('./alias.json'),
    root: ['bower_components', 'node_modules', path.src],
    extensions: ['', '.js', '.es6.js', '.jsx']
  };
}

//configuration
module.exports = function(_pathCfg, isDebug, isTest) {

  var pathCfg = _pathCfg || defaultConfig;

  var configObj = {
    context: path.resolve('.'),
    
    module: { },

    devServer: {
      contentBase  : '.',
      publicPath   : ['', pathCfg.dist].join(path.sep),
      hot          : true,
      quiet        : false,
      noInfo       : true,
      stats        : { colors : true }
    },

    devtool: isDebug ? '#source-map' : false,
    debug : isDebug
  };

  configEntry(pathCfg, configObj, isDebug,  isTest);
  configLoader(pathCfg, configObj, isDebug,  isTest);
  configPlugin(pathCfg, configObj, isDebug,  isTest);
  configResolve(pathCfg, configObj, isDebug,  isTest);

  return configObj;
};

