/**
 * this task depends build:copy
 * */
'use strict';

var pathCfg = require('../../../package.json').path;

module.exports = function(gulp){
  return function(){
    return gulp.watch(pathCfg.assets, ['build:copy']);
  };
};
