'use strict';

module.exports = function () {
  return function(){
    require('gulp-livereload').listen();
  };
};
