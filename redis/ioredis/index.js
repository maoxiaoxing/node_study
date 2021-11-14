const ioredis = require('ioredis')

const redis = new ioredis({
  port: 6379,
  host: '82.156.97.16'
})


redis.set('foo', 'bar', (err, ret) => {
  if (err) {
    return console.log('写入失败', err)
  }

  console.log('写入成功', ret)
})
