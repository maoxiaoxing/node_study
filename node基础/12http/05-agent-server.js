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
    const obj = Buffer.concat(arr).toString()
    if (req.headers['content-type'] === 'application/json') {
      const aa = JSON.parse(obj)
      aa.add = '互联网'
      res.end(JSON.stringify(aa))
    }
  })
})

server.listen(3000, () => {
  console.log('server is running')
})
