'use strict';

var pathCfg = require('../../../package.json').path;
var path = require('path');
var copy = require('gulp-copy');

module.exports = function(gulp){
  return function(){
    return gulp.src(pathCfg.assets).pipe(copy(pathCfg.dist))
          && gulp.src(pathCfg.globalLibs).pipe(gulp.dest([pathCfg.dist, pathCfg.vendor].join(path.sep)));
  };
};
