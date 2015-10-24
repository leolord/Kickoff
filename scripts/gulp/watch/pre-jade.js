'use strict';

var jade        = require('gulp-jade');
var jadeGlob    = require('../globs.js').jadeGlob;
var livereload  = require('gulp-livereload');
var pathCfg     = require('../../../package.json').path;
var plumber     = require('gulp-plumber');

module.exports = function(gulp){

  return function(){

    return gulp.src(jadeGlob)
            .pipe(plumber())
            .pipe(jade({
              locals: {debug: true}
            }))
            .pipe(gulp.dest(pathCfg.dist))
            .pipe(livereload());
  };

};
