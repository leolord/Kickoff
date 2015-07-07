'use strict';

var pathCfg = require('../../../package.json').path;
var path = require('path');

module.exports = function(gulp, plugins, ts) {
  var lessGlob = require('../globs.js').lessGlob;
  var lessOutputDir = path.join(pathCfg.dist);

  return function() {

    return gulp.src(lessGlob)
               .pipe( plugins.less({ plugins: [plugins.autoprefix, plugins.cleancss] }))
               .on('error', plugins.gutil.log)
               .pipe(plugins.rename(function(cssFile){
                 cssFile.basename += '.' + ts;
               }))
               .pipe(gulp.dest(lessOutputDir));
  };

};

