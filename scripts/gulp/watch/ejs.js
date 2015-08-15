/**
 * this task depends build:ejs
 * */
'use strict';

var ejsGlob = require('../globs.js').ejsGlob;

module.exports = function(gulp){

  return function(){
    return gulp.watch(ejsGlob, ['watch:pre-ejs']);
  };
};
