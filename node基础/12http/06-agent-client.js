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
    "Content-type": "application/json",
  }
}

const req = http.request(options, (res) => {

})
// req.end('小熊饼干')
req.end('{"name": "小熊饼干"}')


