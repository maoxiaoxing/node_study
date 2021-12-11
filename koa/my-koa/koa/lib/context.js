const context = {}

defineProperty('request', 'method')
defineProperty('request', 'url')
defineProperty('response', 'body')


function defineProperty (target, name) {
  // context.__defineGetter__(name, function () {
  //   return this[target][name]
  // })
  Object.defineProperty(context, name, {
    get () {
      return this[target][name]
    },

    set (value) {
      this[target][name] = value
    }
  })
  // Object.defineProperty(context, name, {
  //   get () {
  //     return this[target][name]
  //   }
  // })
}

module.exports = context

