const http = require('http')

const server = http.createServer((req, res) => {
  console.log('123')
})

server.listen(3000, () => {
  console.log('服务运行中...')
})

