const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

const server = http.createServer((req, res) => {
  let {
    pathname,
    query,
  } = url.parse(req.url)
  pathname = decodeURIComponent(pathname)
  const absPath = path.join(__dirname, pathname)
  console.log(absPath)

  fs.stat(absPath, (err, statObj) => {
    if(err) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }

    if (statObj.isFile()) {
      fs.readFile(absPath, (err, data) => {
        res.setHeader('Content-type', `${mime.getType(absPath)};charset=utf-8`)
        res.end(data)
      })
    } else {
      fs.readFile(path.join(absPath, 'index.html'), (err, data) => {
        res.setHeader('Content-type', `${mime.getType(absPath)};charset=utf-8`)
        res.end(data)
      })
    }
  })

  // res.end('123')
})

server.listen(3000, () => {
  console.log('server is running')
})

