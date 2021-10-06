const { Readable } = require('stream')

const source = ['1', '2', '3']

class MyReadable extends Readable {
  constructor(source) {
    super()
    this.source = source
  }

  _read() {
    const data = this.source.shift() || null
    this.push(data)
    return data
  }
}

const myReadable = new MyReadable(source)
myReadable.on('readable', () => {
  let data = null
  while((data = myReadable.read(1)) !== null) {
    console.log(data.toString())
  }
})
