'use strict';

var pathCfg = require('../../../package.json').path;
var path = require('path');

module.exports = function(gulp, plugins, webpackConfig){
  return function(){
    var cfg = webpackConfig.debug();
    return gulp.src(cfg._entryArray)
         .pipe(plugins.plumber())
         .pipe(plugins.webpack(cfg))
         .pipe(gulp.dest(path.join(pathCfg.dist)));
  };
};

