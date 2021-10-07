const fs = require('fs')

const ws = fs.createWriteStream('test.txt', {
  highWaterMark: 3,
})

/**
  01 第一次调用 write 方法时，是将数据直接进行写入到文件中
  02 第二次开始 write 方法就是将数据写入到缓存中
  03 生产速度和消费速度是不一样的，一般情况下生产速度要比消费速度快很多
  04 当 flag 为 false 之后并不意味着当次数据不能被写入了 
     但是我们应该告知数据的生产者，当前的消费速度已经跟不上生产速度了
     这个时候，一般我们会将可读流的模块修改为暂停模式
  05 当数据生产者暂停之后，消费者会慢慢的消化它内过不缓存中的数据，直到可以再次被执行写入操作
  06 当缓存区可以继续写入数据 会通过 drain 事件
*/
let flag = ws.write('1')
console.log(flag)

flag = ws.write('2')
console.log(flag)

flag = ws.write('3')
console.log(flag)

flag = ws.write('3')
console.log(flag)

ws.on('drain', () => [
  console.log('111')
])
