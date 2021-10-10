const net = require('net')

const client = net.createConnection({
  host: 'localhost',
  port: 3080
})

client.write('小熊饼干')
// client.write('小熊饼干1')
// client.write('小熊饼干2')
// client.write('小熊饼干3')
// client.write('小熊饼干4')

client.on('data', (chunk) => {
  console.log(chunk.toString())
})
