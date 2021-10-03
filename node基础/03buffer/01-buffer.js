// alloc 为 Buffer 分配空间
// const b1 = Buffer.alloc(10)
// const b2 = Buffer.allocUnsafe(10)

// console.log(b1)
// console.log(b2)


// from
// const b1 = Buffer.from('1')
// const b2 = Buffer.from('中国')
// console.log(b1)
// console.log(b2)

// const b1 = Buffer.from([1,2,3])
// const b2 = Buffer.from([1,2,'中'])
// const b3 = Buffer.from('中')
// console.log(b1)
// console.log(b2)
// console.log(b3.toString())


// from 是新创建空间，而不是和 b1 共享一个空间
// const b1 = Buffer.alloc(3)
// const b2 = Buffer.from(b1)
// console.log(b1)
// console.log(b2)
// b1[0] = 1
// console.log(b1)
// console.log(b2)
