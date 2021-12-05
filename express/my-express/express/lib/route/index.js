const url = require('url')
const methods = require('methods')
const pathRegexp = require('path-to-regexp')

function Router () {
  this.stack = []
}

methods.forEach((method) => {
  Router.prototype[method] = function (path, handler) {
    this.stack.push({
      path,
      method,
      handler,
    })
  }
})

Router.prototype.handle = function (req, res) {
  const { pathname } = url.parse(req.url)
  const method = req.method.toLowerCase()
  const route = this.stack.find((route) =>  {
    const keys = []
    const regexp = pathRegexp(route.path, keys, {})
    const match = regexp.exec(pathname)
    return match && route.method === method
  })
  if (route) {
    return route.handler(req, res)
  }
  res.end('404 Not Found.')  
}

module.exports = Router

