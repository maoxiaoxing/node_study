const http = require('http')

class Application {
  listen (...args) {
    const server = http.createServer((req, res) => {
      res.end('my koa')
    })
    server.listen(...args)
  }
}

module.exports = Application

