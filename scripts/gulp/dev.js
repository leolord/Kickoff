'use strict';
var pathCfg        = require('../../package.json').path;

var express        = require('express');
var path           = require('path');
var sassMiddleware = require('node-sass-middleware');
var Promise        = require('bluebird');
var serveIndex     = require('serve-index');

var webpack              = require('webpack');
var webpackMiddleware    = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackCfgGenerator  = require('../webpack/webpack-config.generator.js');

var debugCfg, app, pathBase, compiler, assets, idx, vendorMap = [], libPath, distPath;

function initVars() {
  debugCfg = webpackCfgGenerator(pathCfg, true);
  app      = express();
  pathBase = process.cwd();
  compiler = webpack(debugCfg);
  distPath = '/' + pathCfg.dist.replace(/^[.\/\\]*/, '');
}

function parseJade(){
  // Jade
  app.set('view engine', 'jade');
  app.set('views', pathCfg.template);
  app.locals.pretty = true;
  app.get(distPath + '/:page.html', function(req, res) {
    res.render(req.params.page);
  });
}

function parseSass() {
  // SASS
  app.use(
    sassMiddleware({
      root           : pathBase,
      src            : pathCfg.src,
      dest           : pathCfg.dist,
      debug          : true,
      includePaths   : ['node_modules', 'bower_components'],
      outputStyle    : 'expanded',
      prefix         : distPath,
      response       : false
    })
  );
}

function parseAssets() {
  // vendor
  for (idx = 0; idx < pathCfg.globalLibs.length; ++idx) {
    libPath = pathCfg.globalLibs[idx].split(/[\/\]]/).slice(-1)[0];
    vendorMap[libPath] = pathCfg.globalLibs[idx];
    app.use('/' + pathCfg.dist + '/vendor/' + libPath,
            express['static'](pathCfg.globalLibs[idx]));
  }

  // assets
  for (idx = 0; idx < pathCfg.assets.length; ++idx) {
    assets = pathCfg.assets[idx];
    app.use('/' + [pathCfg.dist, assets].join(path.sep), express['static'](assets));
  }
}

function runWebpack() {
  // webpack
  app.use(webpackMiddleware(compiler, {
    noInfo     : true,
    quiet      : false,
    hot        : true,
    publicPath : distPath,

    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    headers: { 'X-Server-Name': 'Leolord' },
    stats: {
      colors: true
    }
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
}

function parseRoot() {
  app.use(distPath, express['static'](pathCfg.dist));
  app.use('/', serveIndex('.', {'icons': true}));
}

function configApp() {
  // start server
  app.enable('trust proxy');
  app.disable('x-powered-by');
}

function startServer(){
  initVars();
  parseJade();
  parseSass();
  parseAssets();
  runWebpack();
  parseRoot();
  configApp();

  app.listen(8080, function () {
    console.log('DevServer started up at http://127.0.0.1:8080');
  });

  return app;
}

if(require.main === module) {
  startServer();
} else {
  module.exports = function(){
    return new Promise(function (resolve) {
      startServer()
      .on('error', resolve)
      .on('exit', resolve);
    });
  };
}

