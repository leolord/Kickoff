'use strict';

var pathCfg = require('../../../package.json').path;
var path = require('path');

module.exports = function(gulp, plugins, ts) {
  var lessGlob = require('../globs.js').lessGlob;
  var lessOutputDir = path.join(pathCfg.dist);

  return function() {

    return gulp.src(lessGlob)
               .pipe(plugins.plumber())
               .pipe( plugins.less({ plugins: [plugins.autoprefix, plugins.cleancss] }))
               .pipe(plugins.rename(function(cssFile){
                 cssFile.basename += '.' + ts;
               }))
               .pipe(gulp.dest(lessOutputDir));
  };

};

