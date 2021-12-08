const Koa = require('koa')
const Router = require('@koa/router')
const static = require('koa-static')
const path = require('path')
const mount = require('koa-mount')
const fs = require('fs')
const util = require('util')
const koacompose = require('koa-compose')

const app = new Koa()

// 捕获中间件错误，必须保证后面的中间件也使用 async...await
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 500
    ctx.body = '服务器端错误'
  }
})

app.use(mount('/public', static(path.join(__dirname, './public'))))

// 洋葱模型 中间件执行顺序
const one = (ctx, next) => {
  console.log('in one')
  next()
  console.log('out one')
}

const two = (ctx, next) => {
  console.log('in two')
  next()
  console.log('out two')
}

const three = (ctx, next) => {
  console.log('in three')
  next()
  console.log('out three')
}
// 中间件合并
app.use(koacompose([one, two, three]))

// app.use(one)
// app.use(two)
// app.use(three)


// 异步中间件
app.use(async (ctx, next) => {
  const data = await util.promisify(fs.readFile)('./public/index.html', 'utf8')
  // const data = await util.promisify(fs.readFile)('./public/foo.html')
  // ctx.type = 'html'
  ctx.body = data
  next()
})




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


