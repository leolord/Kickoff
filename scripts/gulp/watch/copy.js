/**
 * this task depends build:copy
 * */
'use strict';

var pathCfg = require('../../../package.json').path;

module.exports = function(gulp, plugins){
  return function(){
    return gulp.src(pathCfg.assets)
            .pipe(plugins.copy(pathCfg.dist))
            .pipe(plugins.livereload());
  };
};
