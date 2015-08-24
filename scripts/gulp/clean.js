'use strict';

var pathCfg = require('../../package.json').path;

module.exports = function(gulp, plugins){
  return function(cb){
    return plugins.del([pathCfg.dist, '*.tar.gz'], cb);
  };
};
