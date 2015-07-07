/**
 * this task depends build:ejs
 * */
'use strict';

module.exports = function(gulp){
  var ejsGlob = require('../globs.js').ejsGlob;

  return function(){
    return gulp.watch(ejsGlob, ['build:ejs']);
  };
};
