'use strict';

var pathCfg       = require('../../package.json').path;
var sassGlob      = require('./globs.js').sassGlob ;
var path          = require('path');
var sassOutputDir = path.join(pathCfg.dist);
var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var minCss        = require('gulp-minify-css');
var rev           = require('gulp-rev');

module.exports = function(gulp) {

  return function() {

    return gulp.src(sassGlob)
               .pipe(plumber())
               .pipe( sass({includePaths : 'node_modules'}).on('error', sass.logError))
               .pipe(minCss({compatibility : 'ie8'}) )
               .pipe(rev())
               .pipe(gulp.dest(sassOutputDir));
  };

};

