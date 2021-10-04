const fs = require('fs')
const path = require('path')

function mkDir(dirPath, cb) {
  const parts = dirPath.split('/')
  let index = 1
  
  const next = () => {
    if (index > parts.length) {
      return cb && cb()
    }
    const current = parts.slice(0, index++).join('/')
    fs.access(current, (err) => {
      if (err) {
        fs.mkdir(current, next)
      } else {
        next()
      }
    })
  } 
  next()
}

mkDir('a/b/c', () => {
  console.log('创建成功')
})

