'use strict';

var pathCfg = require('../../../package.json').path;
var jadeGlob = require('../globs.js').jadeGlob;

module.exports = function(gulp, plugins){

  return function(){
    var getRepMap = require('./replace-map.js');

    return getRepMap.then(function(repMap){
      return gulp.src(jadeGlob)
            .pipe(plugins.plumber())
            .pipe(plugins.jade({
              locals: {debug: false}
            }))
            .pipe(plugins.frep(repMap))
            .pipe(plugins.minHtml({ empty: true, conditionals:true}))
            .pipe(gulp.dest(pathCfg.dist));
    });
  };

};
