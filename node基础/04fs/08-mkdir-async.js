const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

// function mkDir(dirPath, cb) {
//   const parts = dirPath.split('/')
//   let index = 1
  
//   const next = () => {
//     if (index > parts.length) {
//       return cb && cb()
//     }
//     const current = parts.slice(0, index++).join('/')
//     fs.access(current, (err) => {
//       if (err) {
//         fs.mkdir(current, next)
//       } else {
//         next()
//       }
//     })
//   } 
//   next()
// }

// mkDir('a/b/c', () => {
//   console.log('创建成功')
// })


const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

async function myMkdir (dirPath, cb) {
  const parts = dirPath.split('/')

  for (let index = 1; index <= parts.length; index++) {
    const current = parts.slice(0, index).join('/')
    try {
      await access(current)
    } catch (err) {
      await mkdir(current)
    }
  }
  cb && cb()
}

myMkdir('a/b/c', () => {
  console.log('创建成功')
})

