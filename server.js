/* global require __dirname */
var express = require('express')
  , md = require('ghm').parse
  , fs = require('fs')
  , path = require('path')
  , template = require('./lib/template')

var app = express.createServer( express.bodyParser() )
  , required = {}
  , oneYear = 31557600000
  , contentRoot = path.resolve(__dirname ,'/content')

app.use(express.favicon(__dirname + '/htdocs/favicon.ico'))
app.use(express.static(__dirname + '/htdocs' ,{ maxAge: oneYear }))

app.get( '/*?' ,function (req ,res) {
  var path = split_params(req.params[0])
    , filename = path[1] || '404'
    , fileList = fs.readdirSync(contentRoot)

  filename += '.md'

  if (!fileList.some(function (el ,idx ,arr) { return el == filename })) {
    filename = '404.md'
  }

  var content = fs.readFileSync(filename ,'utf8')
  res.send(template.process( 'index' ,{ content: md(content)
                                      , title: 'foo'
                                      , root: '/'
                                      } ))
})

function split_params (params) {
  params = params == undefined ? '' : params
  return params.split(/\//)
}

app.listen(8080)
