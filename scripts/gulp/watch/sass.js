/**
 * this task depends build:sass
 * */
'use strict';

module.exports = function(gulp){
  var sassGlob      = require('../globs.js').sassGlob;

  return function(){
    return gulp.watch(sassGlob, ['watch:pre-sass']);
  };
};
