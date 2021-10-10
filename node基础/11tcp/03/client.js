const net = require('net')
const dealData = require('./dealData')
const MyTransform = require('./myTransform')

let ts = new MyTransform()

const client = net.createConnection({
  host: 'localhost',
  port: 3080
})

client.write(ts.encode('小熊饼干'))
client.write(ts.encode('小熊饼干1'))
client.write(ts.encode('小熊饼干2'))
client.write(ts.encode('小熊饼干3'))
client.write(ts.encode('小熊饼干4'))
// client.write('小熊饼干1')
// client.write('小熊饼干2')
// client.write('小熊饼干3')
// client.write('小熊饼干4')

client.on('data', (chunk) => {
  // console.log(chunk.toString())

  dealData('client', chunk)
})
