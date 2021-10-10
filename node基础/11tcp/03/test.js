const MyTransform = require('./myTransform')

const ts = new MyTransform()

const str = '小熊饼干'

// console.log(Buffer.from(str))
// console.log(ts.encode(str, 1))

const buf = ts.encode(str, 1)
const a = ts.decode(buf)
console.log(a)

console.log(ts.getPackageLen(buf))

