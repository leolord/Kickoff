'use strict';

var pathCfg = require('../../../package.json').path;
var ejsGlob = require('../globs.js').ejsGlob;

module.exports = function(gulp, plugins){

  return function(){
    var getRepMap = require('./replace-map.js');

    return getRepMap.then(function(repMap){
      gulp.src(ejsGlob)
        .pipe(plugins.plumber())
        .pipe(plugins.ejs())
        .pipe(plugins.frep(repMap))
        .pipe(plugins.min({ empty: true, conditionals:true}))
        .pipe(gulp.dest(pathCfg.dist));
    });
  };

};
