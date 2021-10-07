const fs = require('fs')
const EventEmitter = require('events')

class MyFileReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    const {
      flags,
      mode,
      autoClose,
      start,
      highWaterMark,
    } = options
    this.path = path
    this.flags = flags || 'r'
    this.autoClose = autoClose || true
    this.start = start || 0
    this.end = start
    this.highWaterMark = highWaterMark || 64 * 1024

    this.open()
  }

  open() {
    console.log(121)
    // 原生 open 方法打开指定位置的文件
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit('error', err)
      }
      this.fd = fd
      this.emit('open', fd)
    })
  }
}

const rs = new MyFileReadStream('test.txt')

rs.on('open', (fd) => {
  console.log('open', fd)
})

