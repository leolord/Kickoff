'use strict';

module.exports = function (gulp, plugins) {
  return function(){
    plugins.livereload.listen();
  };
};
