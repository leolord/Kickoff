'use strict';

var gulp = require('gulp');
var webpackConfig = require('./scripts/gulp/load-webpack-config.js')();

var plugins = {
  WebpackDevServer     : require('webpack-dev-server'),
  copy                 : require('gulp-copy'),
  del                  : require('del'),
  frep                 : require('gulp-frep'),
  gitConfig            : require('git-config'),
  jade                 : require('gulp-jade'),
  livereload           : require('gulp-livereload'),
  minCss               : require('gulp-minify-css'),
  minHtml              : require('gulp-minify-html'),
  plumber              : require('gulp-plumber'),
  rename               : require('gulp-rename'),
  rev                  : require('gulp-rev'),
  sass                 : require('gulp-sass'),
  sequence             : require('gulp-sequence'),
  webpackCli           : require('webpack')
};

gulp.task('show:config',   require('./scripts/gulp/show-config.js')(gulp, plugins, webpackConfig));

gulp.task('build:jade',    require('./scripts/gulp/build/jade.js')(gulp, plugins));
gulp.task('build:copy',    require('./scripts/gulp/build/copy.js')(gulp, plugins, webpackConfig));
gulp.task('build:sass',    require('./scripts/gulp/build/sass.js')(gulp, plugins));
gulp.task('build:webpack', require('./scripts/gulp/build/webpack.js')(gulp, plugins, webpackConfig));

gulp.task('clean',         require('./scripts/gulp/clean.js')(gulp, plugins, webpackConfig));

gulp.task('start-livereload', require('./scripts/gulp/watch/start-livereload.js')(gulp, plugins));
gulp.task('watch:pre-jade',  require('./scripts/gulp/watch/pre-jade.js')(gulp, plugins));
gulp.task('watch:pre-sass',  require('./scripts/gulp/watch/pre-sass.js')(gulp, plugins));
gulp.task('watch:pre-webpack',  require('./scripts/gulp/watch/pre-webpack.js')(gulp, plugins, webpackConfig));

gulp.task('watch:jade',     ['watch:pre-jade'], require('./scripts/gulp/watch/jade.js')(gulp, plugins));
gulp.task('watch:sass',     ['watch:pre-sass'], require('./scripts/gulp/watch/sass.js')(gulp, plugins));
gulp.task('watch:copy',     ['build:copy'], require('./scripts/gulp/watch/copy.js')(gulp, plugins));
gulp.task('watch:webpack',  require('./scripts/gulp/watch/webpack.js')(gulp, plugins, webpackConfig));


gulp.task('build',   plugins.sequence(['build:webpack', 'build:sass', 'build:copy'], 'build:jade'));
gulp.task('default', plugins.sequence('clean', 'build'));
gulp.task('dev',     ['start-livereload', 'watch:sass', 'watch:webpack', 'watch:jade', 'watch:copy']);

gulp.task('page', require('./scripts/gulp/new.js')(gulp, plugins, webpackConfig));
