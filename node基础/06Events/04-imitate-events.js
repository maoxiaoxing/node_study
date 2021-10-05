function MyEvent () {
  this._event = Object.create(null)
}

MyEvent.prototype.on = function (type, cb) {
  if (this._event[type]) {
    this._event[type].push(cb)
  } else {
    this._event[type] = [cb]
  }
}

MyEvent.prototype.emit = function (type, ...args) {
  if (this._event && this._event[type].length) {
    this._event[type].forEach((cb) => {
      cb.call(this, ...args)
    })
  }
}



const evt = new MyEvent()

evt.on('en', () => {
  console.log('en执行了')
})
evt.on('en', () => {
  console.log('en执行了')
})

evt.emit('en')
