const http = require('http')

// http.get({
//   host: 'localhost',
//   port: 3000,
//   path: '/?a=1',
// }, (res) => {

// })

const options = {
  host: 'localhost',
  port: 3000,
  path: '/?a=1',
  method: 'POST',
  headers: {
    // "Content-type": "application/json",
    "Content-type": "application/x-www-form-urlencoded",
  }
}

const req = http.request(options, (res) => {
  const arr = []
  res.on('data', (data) => {
    arr.push(data)
  })
  res.on('end', () => {
    console.log(Buffer.concat(arr).toString())
  })
})
// req.end('小熊饼干')
// req.end('{"name": "小熊饼干"}')
req.end('a=1&b=2')



