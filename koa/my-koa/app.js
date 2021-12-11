const Koa = require('./koa')
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

const app = new Koa()

app.use(async (ctx) => {
  // ctx.body = 'string'

  // ctx.body = 123

  // const data = await readFile('./package.json')
  // ctx.body = data

  // ctx.body = fs.createReadStream('./package.json')

  // ctx.body = { foo: 'bar' }
  // ctx.body = [1, 2, 3]
})

const one = (ctx, next) => {
  console.log(ctx.req.url)
  console.log(ctx.req.method)
  console.log('one >>')
  next()
  console.log('one <<')
}

const two = (ctx, next) => {
  console.log('two >>')
  next()
  console.log('two <<')
}

const three = (ctx, next) => {
  console.log('three >>')
  next()
  console.log('three <<')
}

// app.use(one)
// app.use(two)
// app.use(three)

app.listen(3000, () => {
  console.log(`http://loacalhost:3000/`)
})

