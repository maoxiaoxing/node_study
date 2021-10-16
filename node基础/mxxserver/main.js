const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs').promises
const { createReadStream } = require('fs')
const mime = require('mime')
const ejs = require('ejs')
const { promisify } = require('util')

function mergeConfig(config) {
  return {
    port: 3000,
    directory: process.cwd(),
    ...config
  }
}
class Server {
  constructor(config) {
    this.config = mergeConfig(config)
    console.log(this.config)
  }

  start() {
    const server = http.createServer(this.serverHandle.bind(this))
    server.listen(this.config.port, () => {
      console.log('服务已经启动了...')
    })
  }

  async serverHandle(req, res) {
    let { pathname } = url.parse(req.url)
    pathname = decodeURIComponent(pathname)
    const abspath = path.join(this.config.directory, pathname)
    try {
      const statObj = await fs.stat(abspath)
      if (statObj.isFile()) {
        this.fileHandle(req, res, abspath)
      } else {
        const dirs = await fs.readdir(abspath)
        const renderFile = promisify(ejs.renderFile)
        let ret = await renderFile(path.resolve(__dirname, 'template.html'), {
          arr: dirs,
        })
        res.end(ret)
      }
    } catch(err) {
      this.errorHandle(req, res, err)
    }
  }

  errorHandle(req, res, err) {
    res.statusCode = 404
    res.setHeader('Content-type', 'text/html;charset=utf-8')
    res.end('Not Found')
  }

  fileHandle(req, res, abspath) {
    res.statusCode = 200
    res.setHeader('Content-type', `${mime.getType(abspath)};charset=utf-8`)
    createReadStream(abspath).pipe(res)
  }
}

module.exports = Server
