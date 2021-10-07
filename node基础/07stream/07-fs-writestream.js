const fs = require('fs')

const ws = fs.createWriteStream('text.txt', {
  flags: 'w',
  mode: 438,
  fd: null,
  encoding: 'utf-8',
  start: 0,
  highWaterMark: 3,
})

// ws.write('小羊吃草', () => {
//   console.log('数据写入完成')
// })

// // 写入字符串 或者 buffer
// ws.write('123456', () => {
//   console.log('数据写入完成')
// })

ws.on('open', (fd) => {
  console.log('open', fd)
})

ws.write('123')

ws.on('close', () => {
  console.log('文件关闭了')
})

// end之后不能写入
ws.end('456')

