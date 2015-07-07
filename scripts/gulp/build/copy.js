'use strict';

var pathCfg = require('../../../package.json').path;
var path = require('path');

module.exports = function(gulp, plugins){
  return function(){
    return gulp.src(pathCfg.assets).pipe(plugins.copy(pathCfg.dist))
          && gulp.src(pathCfg.globalLibs).pipe(gulp.dest([pathCfg.dist, pathCfg.vendor].join(path.sep)));
  };
};
