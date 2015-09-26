/**
 * this task depends build:jade
 * */
'use strict';

module.exports = function(gulp){
  var jadeGlob = require('../globs.js').jadeDebugGlob;

  return function(){
    return gulp.watch(jadeGlob, ['watch:pre-jade']);
  };
};
