const net = require('net')

const server = net.createServer()

server.listen(3000, () => {
  console.log('服务器运行中...')
})

server.on('connection', (_socket) => {
  _socket.on('data', (data) => {
    console.log(data.toString())
  })
  _socket.end('test http request')
})
