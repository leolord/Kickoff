'use strict';

var pathCfg       = require('../../../package.json').path;
var sassGlob      = require('../globs.js').sassGlob;
var path          = require('path');
var sassOutputDir = path.join(pathCfg.dist);

module.exports = function(gulp, plugins) {

  return function() {

    return gulp.src(sassGlob)
               .pipe(plugins.plumber())
               .pipe( plugins.sass({includePaths : 'node_modules'}).on('error', plugins.sass.logError))
               .pipe(gulp.dest(sassOutputDir))
               .pipe(plugins.livereload());
  };
};

