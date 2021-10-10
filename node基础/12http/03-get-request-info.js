const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  // http://localhost:3000/index.html?a=1 会取到 / 后面所有的内容
  // console.log(req.url)

  //分解请求路径信息
  const obj = url.parse(req.url, true)
  console.log(obj)

  // 请求方法
  console.log(req.method)

  // http版本号
  console.log(req.httpVersion)

  // 请求头
  console.log(req.headers)

  // 请求数据获取
  const arr = []
  req.on('data', (data) => {
    arr.push(data)
  })
  req.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  })
})

server.listen(3000, () => {
  console.log('服务运行中...')
})

