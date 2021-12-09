const http = require('http')

class Application {
  constructor () {
    this.middleware = []
  }

  listen (...args) {
    const server = http.createServer((req, res) => {
      this.callback()
    })
    server.listen(...args)
  }

  use (fn) {
    this.middleware.push(fn)
  }

  compose (middleware) {
    return function () {
      const dispatch = (index) => {
        if (index >= middleware.length) {
          return Promise.resolve()
        }
        const fn = middleware[index]
        return Promise.resolve(
          fn({}, () => dispatch(index + 1))
        )
      }

      return dispatch(0)
    }
  }

  callback () {
    const fnMiddleware = this.compose(this.middleware)
    const handleRequest = (req, res) => {
      fnMiddleware()
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

