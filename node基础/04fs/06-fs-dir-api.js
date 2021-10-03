const fs = require('fs')

// access
// fs.access('a.txt', (err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('有操作权限')
//   }
// })


// stat
// fs.stat('a.txt', (err, statObj) => {
//   console.log(statObj)
//   console.log(statObj.isFile())
//   console.log(statObj.isDirectory())
// })


// mkdir
// fs.mkdir('/a/b/c', {recursive: true}, (err) => {
//   if (!err) {
//     console.log('创建成功')
//   } else {
//     console.log(err)
//   }
// })


// rmdir
// fs.rmdir('a', {recursive: true},(err) => {
//   if (!err) {
//     console.log('删除成功')
//   } else {
//     console.log(err)
//   }
// })


// readdir
// fs.readdir('a/b', (err, files) => {
//   console.log(files)
// })


// unlink
fs.unlink('a/a.txt', (err) => {
  if (!err) {
    console.log('删除成功')
  }
})
