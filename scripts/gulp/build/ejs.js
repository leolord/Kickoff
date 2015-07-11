'use strict';

var pathCfg = require('../../../package.json').path;

module.exports = function(gulp, plugins, ts){
  var ejsGlob = require('../globs.js').ejsGlob;

  return function(){

    return gulp.src(ejsGlob)
               .pipe(plugins.plumber())
               .pipe(plugins.ejs({
                 ts : ts
               }))
               .pipe(plugins.min({ empty: true, conditionals:true}))
               .pipe(gulp.dest(pathCfg.dist));
  };

};
