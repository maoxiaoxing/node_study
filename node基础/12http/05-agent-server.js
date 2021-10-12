const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const {
    pathname,
    query,
  } = url.parse(req.url)
  console.log(pathname, '---', query)

  // post
  const arr = []
  req.on('data', (data) => {
    arr.push(data)
  })
  req.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  })
})

server.listen(3000, () => {
  console.log('server is running')
})
