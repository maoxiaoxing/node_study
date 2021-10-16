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
        let dirs = await fs.readdir(abspath)
        dirs = dirs.map((item) => {
          return {
            path: path.join(pathname, item),
            dirs: item,
          }
        })
        const renderFile = promisify(ejs.renderFile)

        const parentPath = path.dirname(pathname)

        let ret = await renderFile(path.resolve(__dirname, 'template.html'), {
          arr: dirs,
          parent: pathname === '/' ? false : true,
          parentPath: parentPath,
          title: path.basename(abspath),
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
