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

rs.on('data', (chunk) => {
  console.log(chunk.toString())
})



