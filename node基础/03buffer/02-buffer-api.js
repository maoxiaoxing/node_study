let buf = Buffer.alloc(6)

// fill
// buf.fill('123')
// buf.fill('123', 1)
// buf.fill('123', 1, 3)
// buf.fill(123)
// console.log(buf)
// console.log(buf.toString())


// wirte
// buf.write('123')
// buf.write('123', 1, 6)
// console.log(buf)
// console.log(buf.toString())


// toString
// buf = Buffer.from('国庆节快乐')
// console.log(buf)
// console.log(buf.toString('utf-8'))
// console.log(buf.toString('utf-8', 9, 15))


// slice
// buf = Buffer.from('国庆节快乐')
// const b1 = buf.slice(9, 15)
// console.log(b1)
// console.log(b1.toString())


// indexOf
// buf = Buffer.from('国庆节快乐')
// console.log(buf)
// console.log(buf.indexOf('快乐'))
// console.log(buf.indexOf('快乐', 6))


// copy
let b1 = Buffer.alloc(6)
let b2 = Buffer.from('国庆')
// b2.copy(b1)
b2.copy(b1, 3, 3)
console.log(b1.toString())
console.log(b2.toString())

