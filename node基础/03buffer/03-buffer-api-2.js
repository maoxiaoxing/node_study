let b1 = Buffer.from('国庆')
let b2 = Buffer.from('快乐')

const b = Buffer.concat([b1, b2])
console.log(b)
console.log(b.toString())

const b3 = '123'
console.log(Buffer.isBuffer(b1))
console.log(Buffer.isBuffer(b3))

