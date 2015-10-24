/**
 * this task depends build:copy
 * */
'use strict';

var copy       = require('gulp-copy');
var livereload = require('gulp-livereload');
var pathCfg    = require('../../../package.json').path;

module.exports = function(gulp){
  return function(){
    return gulp.src(pathCfg.assets)
            .pipe(copy(pathCfg.dist))
            .pipe(livereload());
  };
};
