'use strict';

var gulp = require('gulp');
var ts = Date.now();
var webpackConfig = require('./scripts/gulp/load-webpack-config.js')(ts);

var LessPluginAutoprefix = require('less-plugin-autoprefix');
var LessPluginCleanCSS   = require('less-plugin-clean-css');

var plugins = {
  del                  : require('del'),
  gutil                : require('gulp-util'),
  ejs                  : require('gulp-ejs'),
  copy                 : require('gulp-copy'),
  min                  : require('gulp-minify-html'),
  less                 : require('gulp-less'),
  rename               : require('gulp-rename'),
  webpack              : require('gulp-webpack'),
  webpackCli           : require('webpack'),
  WebpackDevServer     : require('webpack-dev-server'),
  autoprefix           : new LessPluginAutoprefix({ browsers: ['> 5%', 'last 3 versions']}),
  cleancss             : new LessPluginCleanCSS({ advanced: true })
};

gulp.task('show:config',   require('./scripts/gulp/show-config.js')(gulp, plugins, webpackConfig));
gulp.task('build:ejs',     require('./scripts/gulp/build/ejs.js')(gulp, plugins, ts));
gulp.task('build:copy',    require('./scripts/gulp/build/copy.js')(gulp, plugins, webpackConfig));
gulp.task('build:less',    require('./scripts/gulp/build/less.js')(gulp, plugins, ts));
gulp.task('build:webpack', require('./scripts/gulp/build/webpack.js')(gulp, plugins, webpackConfig));
gulp.task('clean',         require('./scripts/gulp/clean.js')(gulp, plugins, webpackConfig));

gulp.task('watch:ejs',     require('./scripts/gulp/watch/ejs.js')(gulp, plugins, webpackConfig));
gulp.task('watch:less',    require('./scripts/gulp/watch/less.js')(gulp, plugins, webpackConfig));
gulp.task('watch:copy',    require('./scripts/gulp/watch/copy.js')(gulp, plugins, webpackConfig));
gulp.task('watch:webpack', require('./scripts/gulp/watch/webpack.js')(gulp, plugins, webpackConfig));


gulp.task('build',   ['build:webpack', 'build:less', 'build:ejs', 'build:copy']);
gulp.task('dev',     ['build', 'watch:less', 'watch:webpack', 'watch:ejs', 'watch:copy']);
gulp.task('default', ['build']);
