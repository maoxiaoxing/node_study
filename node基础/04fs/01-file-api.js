const fs = require('fs')
const path = require('path')

// readFile
// fs.readFile(path.resolve('test.txt'), 'utf-8', (err, data) => {
//   console.log(err)
//   console.log(data)
// })


// writeFile
// fs.writeFile('test.txt', '123', {
//   mode: 438,
//   flag: 'r+',
//   encoding: 'utf-8',
// }, (err) => {
//   if (!err) {
//     fs.readFile('test.txt', 'utf-8', (err, data) => {
//       console.log(data)
//     })
//   }
// })


// appendFile
// fs.appendFile('test.txt', 'hahh', (err) => {
//   if (!err) {
//     console.log('写入成功')
//   }
// })


// copyFile
// fs.copyFile('test.txt', 'data.txt', () => {
//   console.log('拷贝成功')
// })


// watchFile
fs.watchFile('data.txt', {
  interval: 20
}, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log('文件被修改了')
    fs.unwatchFile('data.txt')
  }
})
