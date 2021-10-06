const { Transform } = require('stream')

class MyTransform extends Transform {
  constructor() {
    super()
  }

  _transform(chunk, en, next) {
    this.push(chunk.toString().toUpperCase())
    next(null)
  }
}

const t = new MyTransform()

t.write('a', () => {
  console.log('---end')
})

t.on('data', (chunk) => {
  console.log(chunk.toString())
})
