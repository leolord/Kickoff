/**
 * this task depends build:less
 * */
'use strict';

module.exports = function(gulp){
  var lessGlob      = require('../globs.js').lessGlob;

  return function(){
    return gulp.watch(lessGlob, ['build:less']);
  };
};
