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


rs.on('readable', () => {
  let data
  while((data = rs.read(1)) !== null) {
    console.log(data.toString())
    console.log('----', rs._readableState.length)
  }
})



