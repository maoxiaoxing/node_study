// setTimeout(() => {
//   console.log('timeout')
// }, 0)

// setImmediate(() => {
//   console.log('immdieate')
// })


// 按照顺序 timer -> poll -> check
// 执行完 poll 区域 会立即执行 check 区域，然后执行 timer 区
const fs = require('fs')
fs.readFile('./m', () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)

  setImmediate(() => {
    console.log('immdieate')
  })
})
