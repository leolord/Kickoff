'use strict';

var frep     = require('gulp-frep');
var jade     = require('gulp-jade');
var jadeGlob = require('../globs.js').jadeGlob;
var minHtml  = require('gulp-minify-html');
var pathCfg  = require('../../../package.json').path;
var plumber  = require('gulp-plumber');

module.exports = function(gulp){

  return function(){
    var getRepMap = require('./replace-map.js');

    return getRepMap.then(function(repMap){
      return gulp.src(jadeGlob)
            .pipe(plumber())
            .pipe(jade({
              locals: {debug: false}
            }))
            .pipe(frep(repMap))
            .pipe(minHtml({ empty: true, conditionals:true}))
            .pipe(gulp.dest(pathCfg.dist));
    });
  };

};
