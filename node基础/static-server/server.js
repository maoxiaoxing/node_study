const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const {
    pathname,
    query,
  } = url.parse(req.url)

  res.end('123')
})

server.listen(3000, () => {
  console.log('server is running')
})

