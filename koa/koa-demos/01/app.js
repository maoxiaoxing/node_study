const Koa = require('koa')

const app = new Koa()

// koa 没有路由系统

app.use(ctx => {
  ctx.body = 'hello koa'
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})


