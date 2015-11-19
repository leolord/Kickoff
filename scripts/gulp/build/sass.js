'use strict';

var minCss        = require('gulp-minify-css');
var path          = require('path');
var pathCfg       = require('../../../package.json').path;
var plumber       = require('gulp-plumber');
var rev           = require('gulp-rev');
var sass          = require('gulp-sass');
var sassGlob      = require('../globs.js').sassGlob ;
var sassOutputDir = path.join(pathCfg.dist);

module.exports = function(gulp) {

  return function() {

    return gulp.src(sassGlob)
               .pipe(plumber())
               .pipe( sass({includePaths : 'node_modules'}).on('error', sass.logError))
               .pipe( minCss({compatibility : 'ie8'}) )
               .pipe(rev())
               .pipe(gulp.dest(sassOutputDir));
  };

};

