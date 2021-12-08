const Koa = require('koa')
const Router = require('@koa/router')
const static = require('koa-static')
const path = require('path')
const mount = require('koa-mount')

const app = new Koa()

app.use(mount('/public', static(path.join(__dirname, './public'))))

// 洋葱模型 中间件执行顺序
const one = (ctx, next) => {
  console.log('in one')
  next()
  console.log('out one')
}

const two = (ctx, next) => {
  console.log('in two')
  // next()
  console.log('out two')
}

const three = (ctx, next) => {
  console.log('in three')
  next()
  console.log('out three')
}

app.use(one)
app.use(two)
app.use(three)



const router = new Router()

router.get('/', (ctx) => {
  ctx.body = 'home page'
})

router.post('/', (ctx) => {
  ctx.body = 'post /'
})

router.get('/foo', (ctx) => {
  ctx.body = 'get foo'
})

router.get('/user/:id', (ctx) => {
  console.log(ctx.params.id)
  ctx.body = 'get /user/:id'
})

// 只能重定向同步请求
router.get('/bar', ctx => {
  // setTimeout(() => {
  // })
  ctx.redirect('/foo')
})

app
  .use(router.routes())
  .use(router.allowedMethods())

// koa 没有路由系统

// app.use(ctx => {
//   console.log(ctx.req.method)
//   console.log(ctx.req.url)

//   // ctx.body = 'hello koa'
//   const path = ctx.path
//   if (path === '/') {
//     ctx.body = 'home page'
//   } else if (path === '/foo') {
//     ctx.body = 'foo page'
//   } else {
//     ctx.body = '404 Not Found'
//   }
// })

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})


