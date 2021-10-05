function MyEvent () {
  this._events = Object.create(null)
}

MyEvent.prototype.on = function (type, cb) {
  if (this._events[type]) {
    this._events[type].push(cb)
  } else {
    this._events[type] = [cb]
  }
}

MyEvent.prototype.emit = function (type, ...args) {
  if (this._events && this._events[type].length) {
    this._events[type].forEach((cb) => {
      cb.call(this, ...args)
    })
  }
}

MyEvent.prototype.off = function (type, cb) {
  if (this._events && this._events[type]) {
    this._events[type] = this._events[type].filter((item) => {
      return item !== cb && item.link !== cb
    })
  }
}

MyEvent.prototype.once = function (type, cb) {
  const fn = function(...args) {
    cb.call(this, ...args)
    this.off(type, fn)
  }
  fn.link = cb
  this.on(type, fn)
}



const evt = new MyEvent()
const fn = () => {
  console.log('en执行了')
}

// evt.on('en', fn)
// evt.on('en', fn)
// evt.off('en', fn)

// evt.emit('en')
evt.once('en', fn)
evt.emit('en')
evt.emit('en')

