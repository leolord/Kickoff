'use strict'

let fs     = require('fs')
let chalk  = require('chalk')
let path   = require('path')
let jade   = require('pug')
let minify = require('html-minifier').minify
let _      = require('lodash')
let ejs    = require('ejs')
let glob   = require('glob')

// html压缩配置
let htmlminCfg = {
  collapseBooleanAttributes   : true,
  collapseInlineTagWhitespace : true,
  collapseWhitespace          : true,
  minifyCSS                   : true,
  minifyJS                    : true,
  removeAttributeQuotes       : true,
  removeEmptyAttributes       : true,
  removeRedundantAttributes   : true,
  useShortDoctype             : true
}

let assetMap = {}
function getAssetsMap () {
  if (assetMap.length > 0) return assetMap

  let assetsByChunkName = require(path.resolve(__dirname, '../stats.json')).assetsByChunkName

  for (let chunkName in assetsByChunkName) {
    if (!assetsByChunkName.hasOwnProperty(chunkName))  continue

    let entries = assetsByChunkName[chunkName]

    if (_.isArray(entries)) {
      assetMap[chunkName] = {
        js  : entries[0],
        css : entries[1]
      }
    } else {
      if (_.endsWith(entries, '.css')) {
        assetMap[chunkName] = {
          js  : 'empty',
          css : entries
        }
        continue
      }
      assetMap[chunkName] = {
        js  : entries,
        css : 'empty'
      }
    }
  }

  return assetMap
}

glob('./templates/*.jade', function (er, files) {
  if (er) {
    return console.error(chalk.red(er))
  }

  files.forEach(function (fileName) {
    console.log('Begin Compiling: ' + chalk.green(fileName))
    let htmlPageName = path.basename(fileName, '.jade')
    let targetFilePath = './dist/' + htmlPageName + '.html'
    let html = jade.renderFile(fileName, {
      debug: false,
      build: getAssetsMap()
    })

    html = minify(html, htmlminCfg)
    fs.writeFile(targetFilePath, html, 'utf8', function () {
      console.log('Finish Compiling: ' + chalk.blue(fileName) + '\r\n\tSaved To: ' + chalk.yellow(targetFilePath))
    })
  })
})

glob('./templates/*.ejs', function (er, files) {
  if (er) {
    return console.error(chalk.red(er))
  }

  files.forEach(function (fileName) {
    console.log('Begin Compiling: ' + chalk.green(fileName))
    let htmlPageName = path.basename(fileName, '.ejs')
    let targetFilePath = './dist/' + htmlPageName + '.html'

    let htmlMin = function (err, _html) {
      if (err) {
        return console.error(chalk.red(err))
      }

      let html = minify(_html, htmlminCfg)
      fs.writeFile(targetFilePath, html, 'utf8', function () {
        console.log('Finish Compiling: ' + chalk.blue(fileName) + '\r\n\tSaved To: ' + chalk.yellow(targetFilePath))
      })
    }

    ejs.renderFile(fileName, {
      debug: false,
      build: getAssetsMap()
    }, htmlMin)
  })
})
