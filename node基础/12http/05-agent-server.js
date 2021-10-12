const http = require('http')
const url = require('url')
const querystring = require('querystring')

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
    const ContentType = req.headers['content-type']
    if (ContentType === 'application/json') {
      const aa = JSON.parse(obj)
      aa.add = '互联网'
      res.end(JSON.stringify(aa))
    } else if (ContentType === 'application/x-www-form-urlencoded') {
      // const ret = querystring.parse(obj)
      const ret = {}
      const entries = new URLSearchParams(obj).entries()
      for(const [key, value] of entries) {
        ret[key] = value
      }
      console.log(ret)
      res.end(JSON.stringify(ret))
    }
  })
})

server.listen(3000, () => {
  console.log('server is running')
})
