const express = require('express')

const app = express()

const myLogger = (req, res, next) => {
  console.log(req.method, req.url, Date.now())
  next()
}
app.use(myLogger)

// 不关心请求路径
// app.use(function (req, res, next) {
//   console.log('Time:', Date.now())
//   next()
// })

// 限制请求路径
// app.use('/user/:id', function (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// })

// 限制请求方法 + 请求路径
// app.get('/user/:id', function (req, res, next) {
//   console.log(req.method, req.params.id)
//   res.send('USER')
// })

// 多个函数处理
// app.get('/user/:id', function (req, res, next) {
//   console.log('ID:', req.params.id)
//   next()
// }, function (req, res, next) {
//   console.log('user info')
//   res.send('User Info')
// })

// 为同一个路径定义多个处理中间件
// app.get('/user/:id', function (req, res, next) {
//   console.log('ID:', req.params.id)
//   next()
// }, function (req, res, next) {
//   console.log('user info')
//   res.send('User Info')
//   next()
// })
// app.get('/user/:id', function (req, res, next) {
//   // res.end(req.params.id)
//   console.log(req.params.id)
// })

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/about', (req, res) => {
  res.send('get /about')
})

app.post('/login', (req, res) => {
  res.send('get /login')
})

app.listen(3000, () => {
  console.log('server is running')
})


