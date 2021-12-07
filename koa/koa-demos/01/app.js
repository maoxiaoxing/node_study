const Koa = require('koa')

const app = new Koa()

// koa 没有路由系统

app.use(ctx => {
  console.log(ctx.req.method)
  console.log(ctx.req.url)

  // ctx.body = 'hello koa'
  const path = ctx.path
  if (path === '/') {
    ctx.body = 'home page'
  } else if (path === '/foo') {
    ctx.body = 'foo page'
  } else {
    ctx.body = '404 Not Found'
  }
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})


