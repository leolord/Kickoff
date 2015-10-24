'use strict';

var pathCfg = require('../../package.json').path;
var path    = require('path');

module.exports =  {
  jadeGlob      : [pathCfg.template, '*.jade'].join(path.sep),
  sassGlob      : [ [pathCfg.src, '**/*.scss'].join(path.sep),
                    [pathCfg.src, '**/*.sass'].join(path.sep)]
};
