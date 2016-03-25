'use strict'

let path     = require('path')
let chalk    = require('chalk')
let inquirer = require('inquirer')
let fs       = require('fs')
let Promise  = require('bluebird')
let NOOP     = function () {}
let DO_NOT_CREATE = 'DO NOT CREATE'
let author

try {
  let pckCfg   = require(path.resolve('./package.json'))
  author = pckCfg.author
} catch (e) {
  console.error(e)
  author = 'anonymous'
}

let questions = [{
  type: 'input',
  name: 'pageName',
  message: 'Page Name',

  validate: function (input) {
    return (/^[a-zA-Z][-a-zA-Z0-9\s]+$/).test(input) ? true : 'Invalid Page Name'
  },

  filter: function (input) {
    return input.replace(/^\s+|\s+$/g, '')
  }
}, {
  type: 'input',
  name: 'description',
  message: 'Description'
}, {
  type: 'list',
  name: 'jsExt',
  message: 'JavaScript Dialet',
  choices: ['js', 'vue', 'jsx', 'coffee', DO_NOT_CREATE]
}, {
  type: 'list',
  name: 'styleExt',
  message: 'CSS Dialet',
  choices: ['scss', 'css', 'less', 'sass', DO_NOT_CREATE]
}, {
  type: 'list',
  name : 'tplExt',
  message: 'HTML Template',
  choices: ['jade', 'ejs', DO_NOT_CREATE]
}, {
  type: 'list',
  name: 'platform',
  message: 'Platform',
  choices: ['pc', 'h5'],
  when: function (opt) {
    return opt.tplExt !== DO_NOT_CREATE
  }
}]

function copyFile (sourceFile, targetFile, replaceMap) {
  let tplContent = fs.readFileSync(sourceFile, 'utf-8')

  for (let key in replaceMap) {
    if (!replaceMap.hasOwnProperty(key))  continue

    let reg = new RegExp('\\$' + key + '\\$', 'g')
    tplContent = tplContent.replace(reg, replaceMap[key])
  }

  fs.writeFileSync(targetFile, tplContent)
}

function insertEntry (pageName, entryFilePath) {
  let entryCfgFilePath = './entry.json'
  let entryCfg = {}

  try {
    fs.lstatSync(entryCfgFilePath, fs.W_OK)

    entryCfg = JSON.parse(fs.readFileSync(entryCfgFilePath, 'utf-8'))
  } catch (e) {
    console.warn(chalk.white.bgYellow('Can not read entry.json'))
  }

  entryCfg[pageName] = entryFilePath

  fs.writeFileSync(entryCfgFilePath, JSON.stringify(entryCfg))
}

function createPageFolder (opt) {
  let folderPath = './app/' + opt.pageName

  return new Promise(function (resolve, reject) {
    try {
      fs.mkdirSync(folderPath)
      resolve(opt)
    } catch (e) {
      inquirer.prompt([{
        type    : 'confirm',
        name    : 'overwrite',
        message : 'The page seems already exists. Do you want to create page anyway?'
      }], function (ans) {
        if (ans.overwrite) {
          resolve(opt)
          return
        }

        reject()
      })
    }
  })
}

function createEntryCss (opt) {
  if (opt.styleExt === DO_NOT_CREATE) return opt
  let targetPath = 'app/' + opt.pageName + '/index.' + opt.styleExt
  let sourceFile = path.resolve(__dirname, './template/css.' + opt.styleExt)
  opt.filePath = targetPath

  copyFile(sourceFile, targetPath, opt)
  return opt
}

function createEntryJs (opt) {
  if (opt.jsExt === DO_NOT_CREATE) return opt
  let targetPath = './app/' + opt.pageName + '/index.' + opt.jsExt
  let sourceFile = path.resolve(__dirname, './template/js.' + opt.jsExt)
  opt.filePath = targetPath

  copyFile(sourceFile, targetPath, opt)
  insertEntry(opt.pageName, targetPath)
  return opt
}

function createEntryTemplate (opt) {
  if (opt.tplExt === DO_NOT_CREATE) return opt
  let targetPath = './templates/' + opt.pageName + '.' + opt.tplExt
  let sourcePath = path.resolve(__dirname, './template/' + opt.platform + '.' + opt.tplExt)
  opt.filePath = targetPath

  copyFile(sourcePath, targetPath, opt)
}

inquirer.prompt(questions, function (opt) {
  opt.author = author

  createPageFolder(opt)
    .then(createEntryJs, NOOP)
    .then(createEntryCss)
    .then(createEntryTemplate)
    .then(function () {
      console.log(chalk.green('Create Page Successfully!'))
    })
})

