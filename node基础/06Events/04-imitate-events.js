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
