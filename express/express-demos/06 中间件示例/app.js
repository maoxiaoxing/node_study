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

// 要从路由器中间件堆栈中跳过其余中间件功能，请调用 next('route') 将控制权传递给下一条路由
// app.get('/user/:id', function (req, res, next) {
//   if (req.params.id === '0') next('route')
//   else next()
// }, function (req, res, next) {
//   res.send('regular')
// })


app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/user/:id', (req, res) => {
  res.send('get /user')
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


