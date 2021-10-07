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
    this.mode = mode || 438
    this.flags = flags || 'r'
    this.autoClose = autoClose || true
    this.start = start || 0
    this.end = start
    this.highWaterMark = highWaterMark || 64 * 1024
    this.readOffset = 0

    this.open()
    this.on('newListener', (type) => {
      console.log(type)
      if (type === 'data') {
        this.read()
      }
    })
  }

  open() {
    // 原生 open 方法打开指定位置的文件
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.emit('error', err)
      }
      this.fd = fd
      this.emit('open', fd)
    })
  }

  read() {
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read)
    }
    const buf = Buffer.alloc(this.highWaterMark)
    fs.read(this.fd, buf, 0, this.highWaterMark, this.readOffset, (err, readBytes) => {
      if (readBytes) {
        this.readOffset += readBytes
        this.emit('data', buf)
        this.read()
      } else {
        this.emit('end')
        this.close()
      }
    })
  }

  close() {
    fs.close(this.fd, () => {
      this.emit('close')
    })
  }
}

const rs = new MyFileReadStream('test.txt')

// rs.on('open', (fd) => {
//   console.log('open', fd)
// })

// rs.on('data', (chunk) => {
//   console.log(chunk)
// })

// rs.on('end', () => {
//   console.log('end')
// })

rs.on('close', () => {
  console.log('close')
})
