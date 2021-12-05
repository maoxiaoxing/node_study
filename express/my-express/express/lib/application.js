const http = require('http')
const url = require('url')
const Router = require('./route')

function App () {
  this._router = new Router()
}

App.prototype.get = function (path, handler) {
  this._router.get(path, handler)
}

App.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    this._router.handle(req, res)     
  })
  server.listen(...args)
}

module.exports = App
