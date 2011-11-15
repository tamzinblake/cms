/* global require module __dirname*/
var y = require('yajet')
  , yajet = new y()
  , fs = require('fs')
  , path = require('path')
  , templateRoot = path.resolve(__dirname ,'../templates')

var templates = { index : function() { return readTemplate('index') }
                , error : function() { return '404 not found' }
                }

function jtprocess (template ,vars) {
  yajet.compile(readTemplate('header'))
  yajet.compile(readTemplate('footer'))
  return yajet.compile(templates[template || 'error']())(vars)
}

function readTemplate (name) {
  var filename = templateRoot + '/' + name + '.jt'
  return fs.readFileSync(filename ,'utf8')
}

module.exports = jtprocess
