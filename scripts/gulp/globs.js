'use strict';

var pathCfg = require('../../package.json').path;
var path = require('path');

module.exports =  {
  ejsGlob  : [pathCfg.template, '*.ejs'].join(path.sep),
  jadeGlob : [pathCfg.template, '*.jade'].join(path.sep),
  lessGlob : [pathCfg.src, '**/*.less'].join(path.sep)
};
