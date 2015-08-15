'use strict';

var cfg     = require('../../package.json');
var path    = require('path');
var pathCfg = cfg.path;
var author  = cfg.author || '';

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
    type    : 'list',
    name    : 'pageType',
    message : '页面类型',
    choices : [
      'h5',
      'pc'
    ]
  }, {
    type    : 'list',
    name    : 'template',
    message : '模板类型',
    choices : [
      'jade',
      'ejs'
    ]
  }
];

module.exports = function(gulp, plugins){

  plugins.gitConfig(function(err, config){
    if(err)return;
    author = config.user.name + '(' + config.user.email + ')';
  });

  return function(){

    var promise = new Promise(function(resolve, reject){

      inquirer.prompt(questions, function(ans){
        var templateName = './scripts/template/' + ans.pageType + '.' + ans.template;

        var totalCopy = 0;
        var counter = 0;
        var bothComplete = function(){
          ++counter;
          if(counter === totalCopy){
            resolve();
          }
        };

        /*eslint max-params:[1, 4]*/
        var copyFile = function(file, dest, errorMsg, rename){
          ++totalCopy;

          gulp.src(file)
              .pipe(plugins.frep([{
                pattern: /<\$=pageName\$>/g,
                replacement: ans.pageName
              }, {
                pattern: /<\$=author\$>/g,
                replacement: author
              }, {
                pattern: /<\$=date\$>/g,
                replacement: new Date().toString()
              }]))
              .pipe(plugins.rename(function(targetFile){
                if(rename){
                  targetFile.basename = rename.name;
                  targetFile.extname = rename.ext;
                }
              }))
              .pipe(gulp.dest(dest))
              .on('end', bothComplete)
              .on('error', function(err){
                reject(errorMsg);
                console.error(err);
              });
        };

        var srcDir = path.join(pathCfg.src, ans.pageName);

        copyFile('./scripts/template/index.js', srcDir, 'Error in coping javascript file.');
        copyFile('./scripts/template/index.less', srcDir, 'Error in coping less file.');

        copyFile(templateName, pathCfg.template,
                 'Error in coping template file',
                 {name : ans.pageName, ext: '.' + ans.template});
      });
    });


    return promise;
  };
};
