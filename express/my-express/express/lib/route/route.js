const methods = require('methods')
const Layer = require('./layer')

function Route () {
  this.stack = []
}

Route.prototype.dispatch = function () {

}

methods.forEach((method) => {
  Route.prototype[method] = function (path, handlers) {
    handlers.forEach(handler => {
      const layer = new Layer(path, handler)
      layer.method = method
      this.stack.push(layer)
    })
  }
})

module.exports = Route
