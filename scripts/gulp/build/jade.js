'use strict';

var pathCfg = require('../../../package.json').path;

module.exports = function(gulp, plugins, ts){
  var jadeGlob = require('../globs.js').jadeGlob;

  return function(){

    return gulp.src(jadeGlob)
               .pipe(plugins.plumber())
               .pipe(plugins.jade({
                 locals : {
                   ts : ts
                 }
               }))
               .pipe(plugins.min({ empty: true, conditionals:true}))
               .pipe(gulp.dest(pathCfg.dist));
  };

};
