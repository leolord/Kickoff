/**
 * this task depends build:jade
 * */
'use strict';

module.exports = function(gulp){
  var jadeGlob = require('../globs.js').jadeGlob;

  return function(){
    return gulp.watch(jadeGlob, ['build:jade']);
  };
};
