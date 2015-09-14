'use strict';

var pathCfg = require('../../../package.json').path;
var jadeGlob = require('../globs.js').jadeGlob;

module.exports = function(gulp, plugins){

  return function(){

    return gulp.src(jadeGlob)
            .pipe(plugins.plumber())
            .pipe(plugins.jade())
            .pipe(gulp.dest(pathCfg.dist))
            .pipe(plugins.livereload());
  };

};
