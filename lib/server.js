'use strict';

let path    = require('path');
let fs      = require('fs');
let app     = require('express')();
let webpack = require('webpack');
let cfg     = require(path.resolve(__dirname, './webpack.dev.conf.js'));
let port    = 3000;

let compiler    = webpack(cfg);
let serveStatic = require('serve-static');
let serveIndex  = require('serve-index');
let proxy       = require('express-http-proxy');
let jade        = require('jade');
let ejs         = require('ejs');

// 模板文件
app.get(/\/dist\/.*\.html$/, function(req, res, next){
  let reqPath = '..' + req.path.replace(/\.html$/, '').replace(/\/dist\//, '/templates/');
  reqPath = path.resolve(__dirname, reqPath);

  let jadePath = reqPath + '.jade';
  let ejsPath = reqPath + '.ejs';
  let engine = '', html;

  try {
    fs.lstatSync(jadePath);
    engine = 'jade';
  } catch (e) {
    console.log('No Matching Jade Template File');
  }

  try {
    fs.lstatSync(ejsPath);
    engine = 'ejs';
  } catch (e) {
    console.log('No Matching Ejs Template File');
  }

  switch (engine) {
    case 'jade':
      html = jade.renderFile(jadePath, {
        debug: true
      });
      res.send(html);
      break;
    case 'ejs':
      ejs.renderFile(ejsPath, { debug: true }, { debug: false }, function(err, ejsResult){
        if(err) res.send(err);
        res.send(ejsResult);
      });
      break;
    default:
      next();
  }
});

// webpack 动态编译文件
app.use(require('webpack-dev-middleware')(compiler, {
  lazy: true,
  publicPath: cfg.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}));

// 接口mock
app.use('/mock', proxy('www.qiushibaike.com', {
  forwardPath: function(req) {
    return '/mock' + require('url').parse(req.url).path;
  }
}));

// 图片等资源
app.use('/dist/assets', serveStatic('./assets'));

// 其他静态文件
app.use('/', serveIndex('./', { icons: true }));
app.use('/', serveStatic('./'));

app.listen(port, function(){
  console.log('Start to listen at 3000');
});
