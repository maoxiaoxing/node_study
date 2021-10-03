const fs = require('fs')

const buf = Buffer.alloc(10)

// fs.open('b.txt', 'r', (err, rfd) => {
//   fs.read(rfd, buf, 0, 10, 0, (err, readBytes) => {
//     fs.open('a.txt', 'w', (err, wfd) => {
//       fs.write(wfd, buf, 0, 10, 0, (err, written) => {
//         console.log('写入成功')
//       })
//     })
//   })
// })

// fs.open('a.txt', 'r', (err, rfd) => {
//   fs.open('b.txt', 'a+', (err, wfd) => {
//     fs.read(rfd, buf, 0, 10, 0, (err, readBytes) => {
//       fs.write(wfd, buf, 0, 10, 0, (err, written) => {
//         fs.read(rfd, buf, 0, 5, 10, (err, readBytes) => {
//           fs.write(wfd, buf, 0, 5, 10, (err, written) => {
//             console.log('写入成功')
//           })
//         })
//       })
//     })
//   })
// })


const BUFFER_SIZE = buf.length
let readOffset = 0

fs.open('a.txt', 'r', (err, rfd) => {
  fs.open('b.txt', 'w', (err, wfd) => {
    function next () {
      fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes) => {
        if (!readBytes) {
          // 如果条件成立，说明内容已经读取完毕
          fs.close(rfd, ()=> {})
          fs.close(wfd, ()=> {})
          console.log('拷贝完成')
          return
        }
        readOffset += readBytes
        fs.write(wfd, buf, 0, readBytes, (err, written) => {
          next()
        })
      })
    }
    next()
  })
})
