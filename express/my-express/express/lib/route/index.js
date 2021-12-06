const url = require('url')
const methods = require('methods')
// const pathRegexp = require('path-to-regexp')
const Layer = require('./layer')
const Route = require('./route')

function Router () {
  this.stack = []
}

methods.forEach((method) => {
  Router.prototype[method] = function (path, handlers) {
    // const layer = new Layer(path, handler)
    // layer.method = method
    // this.stack.push(layer)
    const route = new Route()
    const layer = new Layer(path, route.dispatch.bind(route))
    this.stack.push(layer)
    route[method](path, handlers)
  }
})

Router.prototype.handle = function (req, res) {
  const { pathname } = url.parse(req.url)
  const method = req.method.toLowerCase()

  let index = 0
  const next = () => {
    if (index >= this.stack.length) {
      return res.end(`Can not get ${pathname}`)
    }
    const layer = this.stack[index++]
    const match = layer.match(pathname)
    if (match) {
      req.params = req.params || {}
      Object.assign(req.params, layer.params)
    }
    if (match && layer.method === method) {
      return layer.handler(req, res, next)
    }
    next()
  }
  next()

  
  // const layer = this.stack.find((layer) =>  {
  //   // const keys = []
  //   // const regexp = pathRegexp(route.path, keys, {})
  //   const match = layer.match(pathname)

  //   if (match) {
  //     req.params = req.params || {}
  //     // keys.forEach((key, index) => {
  //     //   req.params[key.name] = match[index + 1]
  //     // })
  //     Object.assign(req.params, layer.params)
  //   }
  //   return match && layer.method === method
  // })
  // if (layer) {
  //   return layer.handler(req, res)
  // }
  // res.end('404 Not Found.')  
}

module.exports = Router

