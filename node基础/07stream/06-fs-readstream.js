const fs = require('fs')

const rs = fs.createReadStream('test.txt', {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 438,
  autoClose: true,
  start: 0,
  // end: 3,
  highWaterMark: 2
})

// rs.on('data', (chunk) => {
//   console.log(chunk.toString())
//   rs.pause()
//   setTimeout(() => {
//     rs.resume()
//   }, 1000)
// })


// rs.on('readable', () => {
//   let data
//   while((data = rs.read(1)) !== null) {
//     console.log(data.toString())
//     console.log('----', rs._readableState.length)
//   }
// })


rs.on('open', (fd) => {
  console.log(fd, '文件打开了')
})

rs.on('close', () => {
  console.log('文件关闭了')
})

const bufferArr = []
rs.on('data', (chunk) => {
  // console.log(chunk)
  bufferArr.push(chunk)
})

rs.on('end', () => {
  console.log(Buffer.concat(bufferArr).toString())
  console.log('数据清空之后')
})

rs.on('error', () => {
  console.log('出错了')
})



