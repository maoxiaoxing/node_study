const { Duplex } = require('stream')

class MyDuplex extends Duplex {
  constructor(source) {
    super()
    this.source = source
  }

  _read() {
    const data = this.source.shift() || null
    this.push(data)
  }

  _write(chunk, en, next) {
    process.stdout.write(chunk)
    process.nextTick(next)
  }
}

const source = ['a', 'b', 'c']

const myDuplex = new MyDuplex(source)

// myDuplex.on('data', (chunk) => {
//   console.log(chunk.toString())
// })

myDuplex.write('aa', 'utf-8', () => {
  console.log('end')
})
