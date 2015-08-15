'use strict';

var find = require('find');
var path = require('path');
var dist = require('../../../package.json').path.dist || 'dist';
var Promise = require('bluebird');

module.exports = new Promise(function(resolve, reject){
  find.file(/(index|commons)[-.][a-z0-9]+.(js|css)$/, path.join('.', dist), function(files){
    var distLen = dist.length + 1;
    var result = [];

    for(var i = 0, len = files.length; i < len; ++i){
      var replacement = files[i].substr(distLen);
      var pattern = replacement.replace(/(index|commons)[-.][a-z0-9]+.(js|css)/, '$1.$2');

      result.push({
        pattern     : pattern,
        replacement : replacement
      });
    }

    resolve(result);
  })
  .error(function(){
    reject(arguments);
  });
});

