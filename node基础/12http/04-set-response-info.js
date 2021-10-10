const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'text/html;charset=utf-8')
  res.end('小熊饼干')
})

server.listen(3000, () => {
  console.log('服务运行中...')
})
