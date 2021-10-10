const MyTransform = require('./myTransform.js')

let overageBuffer = null 
let ts = new MyTransform()

function dealData(type, chunk, _socket) {
  if (overageBuffer) {
    chunk = Buffer.concat([overageBuffer, chunk])
  }
  let packageLen = 0
  while(packageLen = ts.getPackageLen(chunk)) {
    const packageCon = chunk.slice(0, packageLen)
    chunk = chunk.slice(packageLen)

    const ret = ts.decode(packageCon)
    if (type === 'server') {
      _socket.write(ts.encode(ret.body, ret.serialNum))
    }
    console.log(ret)
  }
  overageBuffer = chunk
}

module.exports = dealData
