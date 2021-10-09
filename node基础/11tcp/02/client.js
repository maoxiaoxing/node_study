const net = require('net')

const client = net.createConnection({
  port: 8088,
  host: '127.0.0.1',
})

const dataArr = [
  '小熊饼干1',
  '小熊饼干2',
  '小熊饼干3',
  '小熊饼干4',
]

client.on('connect', () => {
  client.write('小熊饼干')
  for(let i = 0; i < dataArr.length; i++) {
    (function(val, index) {
      setTimeout(() => {
        client.write(val)
      }, 1000 * (index+1))
    })(dataArr[i], i)
  }
})

client.on('data', (chunk) => {
  console.log(chunk.toString())
})

client.on('error', (err) => {
  console.log(err)
})

client.on('close', () => {
  console.log('客户端断开连接')
})
