const http = require('http')

const options = {
  host: 'localhost',
  port: 1234,
  path: '/',
  method: 'POST'
}

const server = http.createServer((request, response) => {
  const req = http.request(options, (res) => {
    const arr = []
    res.on('data', (data) => {
      arr.push(data)
    })
    res.on('end', () => {
      let ret = Buffer.concat(arr).toString()
      response.setHeader('Content-type', 'text/html;charset=utf-8')
      response.end(ret)
    })
  })
  req.end('代理服务器')
})

server.listen(3000, () => {
  console.log('代理服务器启动')
})
