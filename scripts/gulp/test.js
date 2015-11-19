'use strict';
var Server = require('karma').Server;
var path = require('path');

module.exports = function () {
  return function(cb){
    new Server({
      configFile: path.join(__dirname, '/../../karma.conf.js'),
      singleRun: true
    }, cb).start();
  };
};
