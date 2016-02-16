'use strict';

var path = require('path');
var chalk = require('chalk');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var fs = require('fs');

var entryFilePath = path.resolve(__dirname, '../entry.json');
var entry;
try {
  fs.accessSync(entryFilePath, fs.F_OK);
  entry = require(entryFilePath);
} catch(e) {
  console.error(chalk.white.bgRed('Could not find entry.json!!!'));
  throw e;
}

var packageNodeModulesPath = path.resolve(__dirname, '../node_modules');

module.exports = {
  entry: entry,
  output: {
    path: path.resolve('./dist/app/'),
    filename: '[name].js',
    chunkFilename: '[id].bundle.js'
  },
  resolveLoader: {
    root: packageNodeModulesPath,
    fallback: packageNodeModulesPath
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.coffee', '.jsx'],
    alias: {
      app: path.resolve('./app')
    }
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    },
    {
      test: /\.js$/,
      loader: 'babel?presets[]=es2015&plugins[]=transform-runtime&cacheDirectory!eslint',
      exclude: [ path.resolve(__dirname, '../node_modules') ]
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.ejs$/,
      loader: 'ejs-loader'
    },
    {
      test: /\.jade$/,
      loader: 'jade'
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
    },
    {
      test: /\.s[ca]ss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass?config=sassLoader')
    },
    {
      test: /\.coffee$/,
      loader: 'coffee-loader'
    },
    {
      test: /\.(coffee\.md|litcoffee)$/,
      loader: 'coffee-loader?literate'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    }]
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: ['> 5%', 'Firefox 15']
      })
    ];
  },
  sassLoader: {
    includePaths: [path.resolve('./node_modules/')]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
};

