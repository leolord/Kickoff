'use strict';

var pathCfg = require('../../package.json').path;

var Q        = require('q');
var inquirer = require('inquirer');

var questions = [
  {
    type     : 'input',
    name     : 'pageName',
    message  : '页面名称',
    validate : function(input){
      return /^[a-zA-Z][-a-zA-Z0-9\s]*$/.test(input) ? true : '非法页面名称';
    }
  }, {
    type   : 'list',
    name   : 'pageType',
    message : '页面类型',
    choices : [
      'h5',
      'pc'
    ]
  }
];

module.exports = function(gulp, plugins){
  return function(){
    var deffered = Q.defer();

    inquirer.prompt(questions, function(ans){
      var counter = 0;
      var bothComplete = function(){
        ++counter;
        if(counter === 2){
          deffered.resolve();
        }
      };

      gulp.src('./scripts/template/' + ans.pageType + '.ejs')
          .pipe(plugins.plumber())
          .pipe(plugins.ejs({
            pageName : ans.pageName
          }, {
            ext : '.ejs'
          }))
          .pipe(plugins.rename(function(file){
            file.basename = ans.pageName;
          }))
          .pipe(gulp.dest(pathCfg.template))
          .on('end', bothComplete);

      gulp.src(['./scripts/template/index.js', './scripts/template/index.less'])
          .pipe(gulp.dest(pathCfg.src + '/' + ans.pageName + '/'))
          .on('end', bothComplete);

    });

    return deffered.promise;
  };
};
