'use strict';

var pathCfg  = require('../../package.json').path;
var jadeGlob = require('./globs.js').jadeGlob;
var jade     = require('gulp-jade');
var plumber  = require('gulp-plumber');
var frep     = require('gulp-frep');
var minHtml  = require('gulp-minify-html');

module.exports = function(gulp){

  return function(){
    var getRepMap = require('./replace-map.js');

    return getRepMap.then(function(repMap){
      return gulp.src(jadeGlob)
            .pipe(plumber())
            .pipe(jade())
            .pipe(frep(repMap))
            .pipe(minHtml({ empty: true, conditionals:true}))
            .pipe(gulp.dest(pathCfg.dist));
    });
  };

};
