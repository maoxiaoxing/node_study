const fs = require('fs')

const rs = fs.createReadStream('test.txt', {
  highWaterMark: 4,
})

const ws = fs.createWriteStream('test1.txt', {
  highWaterMark: 1
})

// rs.on('data', (chunk) => {
//   ws.write(chunk, () => {
//     console.log('写入')
//   })
// })

// 模拟背压机制
let flag = true
// rs.on('data', (chunk) => {
//   flag = ws.write(chunk, () => {
//     console.log('写入')
//   })
//   if (!flag) {
//     rs.pause()
//   }
// })

// ws.on('drain', () => {
//   rs.resume()
// })

rs.pipe(ws)
