const net = require('net')

const server = net.createServer()

const PORT = 8088
const HOST = 'localhost'
server.listen(PORT, HOST)

server.on('listening', () => {
  console.log(`服务已经开启${HOST}:${PORT}`)
})

server.on('connection', (socket) => {
  socket.on('data', (chunk) => {
    const msg = chunk.toString()
    console.log(msg)

    socket.write(Buffer.from(`您好${msg}`))
  })
})

server.on('close', () => {
  console.log('服务关闭了')
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('地址正则被使用')
  } else  {
    console.log(err)
  }
})
