const http = require('http')

const sleepTime = (time) => {
  const sleep = Date.now() + time * 1000
  while(Date.now() < sleep) {}
  return 
}

sleepTime(4)

const server = http.createServer((req, res) => {
  res.end('server is runing...')
})

server.listen(3000, () => {
  console.log('服务启动了')
})
