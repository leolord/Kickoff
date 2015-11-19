'use strict';

var livereload    = require('gulp-livereload');
var path          = require('path');
var pathCfg       = require('../../../package.json').path;
var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var sassGlob      = require('../globs.js').sassGlob;
var sassOutputDir = path.join(pathCfg.dist);

module.exports = function(gulp) {

  return function() {

    return gulp.src(sassGlob)
               .pipe(plumber())
               .pipe(sass({includePaths : 'node_modules'}).on('error', sass.logError))
               .pipe(gulp.dest(sassOutputDir))
               .pipe(livereload());
  };
};

