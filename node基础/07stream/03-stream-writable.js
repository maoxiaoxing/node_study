const { Writable } = require('stream')

class MyWritable extends Writable {
  constructor() {
    super()
  }

  _write(chunk, en, done) {
    process.stdout.write(chunk.toString() + '----')
    process.nextTick(done)
  }
}

const myWritable = new MyWritable()

myWritable.write('aa', 'utf-8', () => {
  console.log('end')
})
