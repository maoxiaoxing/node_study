const http = require('http')

const server = http.createServer((req, res) => {
  const arr = []
  req.on('data', (data) => {
    arr.push(data)
  })
  req.on('end', () => {
    res.end('外部服务器')
  })
})

server.listen(1234, () => {
  console.log('外部服务器启动')
})
