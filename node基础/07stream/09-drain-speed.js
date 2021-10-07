const fs = require('fs')

const ws = fs.createWriteStream('test.txt', {
  highWaterMark: 3
})

// ws.write('123456')
const source = '123456'.split('')

let num = 0
let flag = true
function  executeWrite () {
  flag = true
  while(num !== 6 && flag) {
    flag = ws.write(source[num])
    num++
  }
}

executeWrite()

ws.on('drain', () => {
  console.log('drain')
  executeWrite()
})
