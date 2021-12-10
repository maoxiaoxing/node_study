const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application {
  constructor () {
    this.middleware = []

    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }

  listen (...args) {
    const that = this
    const server = http.createServer(that.callback())
    server.listen(...args)
  }

  use (fn) {
    this.middleware.push(fn)
  }

  compose (middleware) {
    return function (context) {
      const dispatch = (index) => {
        if (index >= middleware.length) {
          return Promise.resolve()
        }
        const fn = middleware[index]
        return Promise.resolve(
          fn(context, () => dispatch(index + 1))
        )
      }

      return dispatch(0)
    }
  }

  createContext(req, res) {
    const context = Object.create(this.context)
    const request = (context.request = Object.create(this.request))
    const response = (context.response = Object.create(this.response))

    context.app = request.app = response.app = this
    context.req = request.req = response.req = req
    context.res = request.res = response.res = res
    request.ctx = response.ctx = context
    request.response = response
    response.request = request
    context.originalUrl = request.originalUrl = req.url
    context.state = {}
    return context
  }

  callback () {
    const fnMiddleware = this.compose(this.middleware)
    const handleRequest = (req, res) => {
      const context = this.createContext(req, res)
      fnMiddleware(context)
        .then(() => {
          console.log('end')
          res.end('cb koa')
        })
        .catch((err) => {
          // console.log('err', err)
          res.end(err.message)
        })

    }

    return handleRequest
  }
}

module.exports = Application

