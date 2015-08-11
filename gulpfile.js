'use strict';

var gulp = require('gulp');
var ts = Date.now();
var webpackConfig = require('./scripts/gulp/load-webpack-config.js')(ts);

var LessPluginAutoprefix = require('less-plugin-autoprefix');
var LessPluginCleanCSS   = require('less-plugin-clean-css');

var plugins = {
  autoprefix           : new LessPluginAutoprefix({ browsers: ['> 5%', 'last 3 versions']}),
  cleancss             : new LessPluginCleanCSS({ advanced: true }),
  copy                 : require('gulp-copy'),
  del                  : require('del'),
  ejs                  : require('gulp-ejs'),
  jade                 : require('gulp-jade'),
  less                 : require('gulp-less'),
  min                  : require('gulp-minify-html'),
  plumber              : require('gulp-plumber'),
  rename               : require('gulp-rename'),
  replace              : require('gulp-replace'),
  sequence             : require('gulp-sequence'),
  webpack              : require('webpack-stream'),
  webpackCli           : require('webpack'),
  WebpackDevServer     : require('webpack-dev-server')
};

gulp.task('show:config',   require('./scripts/gulp/show-config.js')(gulp, plugins, webpackConfig));

gulp.task('build:ejs',     require('./scripts/gulp/build/ejs.js')(gulp, plugins, ts));
gulp.task('build:jade',     require('./scripts/gulp/build/jade.js')(gulp, plugins, ts));
gulp.task('build:copy',    require('./scripts/gulp/build/copy.js')(gulp, plugins, webpackConfig));
gulp.task('build:less',    require('./scripts/gulp/build/less.js')(gulp, plugins, ts));
gulp.task('build:webpack', require('./scripts/gulp/build/webpack.js')(gulp, plugins, webpackConfig));
gulp.task('clean',         require('./scripts/gulp/clean.js')(gulp, plugins, webpackConfig));

gulp.task('watch:ejs',     require('./scripts/gulp/watch/ejs.js')(gulp, plugins, webpackConfig));
gulp.task('watch:jade',     require('./scripts/gulp/watch/jade.js')(gulp, plugins, webpackConfig));
gulp.task('watch:less',    require('./scripts/gulp/watch/less.js')(gulp, plugins, webpackConfig));
gulp.task('watch:copy',    require('./scripts/gulp/watch/copy.js')(gulp, plugins, webpackConfig));
gulp.task('watch:webpack', require('./scripts/gulp/watch/webpack.js')(gulp, plugins, webpackConfig));


gulp.task('build',   ['build:webpack', 'build:less', 'build:ejs', 'build:jade', 'build:copy']);
gulp.task('default', plugins.sequence('clean', 'build'));
gulp.task('dev',     plugins.sequence('default', ['watch:less', 'watch:webpack', 'watch:ejs',
                                      'watch:jade', 'watch:copy']));

gulp.task('page', require('./scripts/gulp/new.js')(gulp, plugins, webpackConfig));
