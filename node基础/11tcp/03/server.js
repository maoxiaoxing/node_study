const net = require('net')

const server = net.createServer()

const PORT = 3080
const HOST = 'localhost'

server.listen(PORT, HOST)

server.on('listening', () => {
  console.log(`服务运行在 ${HOST}:${PORT}`)
})

server.on('connection', (_socket) => {
  _socket.on('data', (chunk) => {
    const msg = chunk.toString()
    console.log(msg)
    _socket.write(Buffer.from('您好' + msg))
  })
})


