'use strict';

var pathCfg = require('../../../package.json').path;

module.exports = function(gulp, plugins, ts){
  var ejsGlob = require('../globs.js').ejsGlob;

  return function(){

    return gulp.src(ejsGlob)
               .pipe(plugins.ejs({
                 ts : ts
               }))
               .on('error', plugins.gutil.log)
               .pipe(plugins.min({ empty: true, conditionals:true}))
               .on('error', plugins.gutil.log)
               .pipe(gulp.dest(pathCfg.dist));
  };

};
