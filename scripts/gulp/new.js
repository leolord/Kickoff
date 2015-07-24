'use strict';

var cfg     = require('../../package.json');
var pathCfg = cfg.path;
var author  = cfg.author || '吴建涛';

var Promise  = require('bluebird');
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

    var promise = new Promise(function(resolve, reject){

      inquirer.prompt(questions, function(ans){
        var ejsOpt = {
          delimiter : '$',
          pageName  : ans.pageName,
          author    : author
        };

        var counter = 0;
        var bothComplete = function(){
          ++counter;
          if(counter === 3){
            resolve();
          }
        };

        var assetsEJS = function(file, ext, errorMsg){
          gulp.src(file)
              .pipe(plugins.ejs(ejsOpt, {
                ext   : ext
              }))
              .pipe(gulp.dest(pathCfg.src + '/' + ans.pageName + '/'))
              .on('error', function(){
                reject(errorMsg);
              })
              .on('end', bothComplete);
        };

        gulp.src('./scripts/template/' + ans.pageType + '.ejs')
            .pipe(plugins.ejs(ejsOpt, {
              ext   : '.ejs'
            }))
            .pipe(plugins.rename(function(file){
              file.basename = ans.pageName;
            }))
            .pipe(gulp.dest(pathCfg.template))
            .on('end', bothComplete)
            .on('error', function(err){
              reject('Errot in coping ejs template');
              console.error(err);
            });

        assetsEJS('./scripts/template/index.js', '.js', 'Error in coping javascript file.');
        assetsEJS('./scripts/template/index.less', '.less', 'Error in coping less file.');

      });
    });


    return promise;
  };
};
