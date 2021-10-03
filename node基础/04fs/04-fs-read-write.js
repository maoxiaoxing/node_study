const fs = require('fs')

// read 读操作就是将数据从磁盘文件中写入到 buffer 中
// fd 定位当前被打开的文件
// buf 用于表示当前缓冲区
// offser 表示当前从 buf 的那个位置开始执行写入
// length 表示当前写入的长度
// position 表示当前文件的哪个位置开始读取
// const buf = Buffer.alloc(10)
// fs.open('data.txt', 'r', (err, rfd) => {
//   console.log(rfd)
//   fs.read(rfd, buf, 0, 4, 2, (err, readBtyes, data) => {
//     console.log(readBtyes, data)
//     console.log(data.toString())
//   })
// })


// write 将缓冲区的内容写入到磁盘中
const buf = Buffer.from('12334567890')
fs.open('b.txt', 'w', (err, wfd) => {
  fs.write(wfd, buf, 2, 6, 0, (err, written, buffer) => {
    console.log(written)
    console.log(buffer)
    console.log(buffer.toString())
    fs.close(wfd, () => {
      console.log(`关闭${wfd}`)
    })
  })
})
