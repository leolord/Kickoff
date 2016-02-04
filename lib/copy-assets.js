'use strict';

let ncp = require('ncp').ncp;
let chalk = require('chalk');


console.log(chalk.green('Begin Copying Assets'));

ncp('./assets', './dist/assets', function(err){
  if(err) {
    return console.error(chalk.red('Error In Copying Assets'));
  }

  console.log(chalk.blue('Finish Copying Assets'));
});
