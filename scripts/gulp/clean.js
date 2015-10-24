'use strict';

var pathCfg = require('../../package.json').path;
var del = require('del');

module.exports = function(){
  return function(cb){
    return del([pathCfg.dist, '*.tar.gz'], cb);
  };
};
