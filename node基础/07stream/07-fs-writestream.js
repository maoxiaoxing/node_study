const fs = require('fs')

const ws = fs.createWriteStream('text.txt', {
  flags: 'w',
  mode: 438,
  fd: null,
  encoding: 'utf-8',
  start: 0,
  highWaterMark: 3,
})

ws.write('小羊吃草', () => {
  console.log('数据写入完成')
})

ws.write('123456', () => {
  console.log('数据写入完成')
})

