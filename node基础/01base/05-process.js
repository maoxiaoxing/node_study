// const fs = require('fs')

// 资源：cpu 内存
// console.log(process.memoryUsage())
// console.log(process.cpuUsage())

// 运行目录
// console.log(process.cwd())

// // node版本
// console.log(process.version)
// console.log(process.versions)

// // 系统是多少位的
// console.log(process.arch)

// 获取环境
// console.log(process.env.NODE_ENV)

// 系统变量
// console.log(process.env.PATH)

// 用户环境地址
// console.log(process.env.USERPROFILE)

// 系统平台
// console.log(process.platform)

// 获取参数
// console.log(process.argv)

// console.log(process.pid)

// 项目运行时间
// console.log(process.uptime())



// 事件
// exit只能执行同步代码，不能执行异步代码
// process.on('exit', (code) => {
//   console.log('exit', code)
//   setTimeout(() => {
//     console.log('异步代码', 'exit')
//   })
// })

// process.on('beforeExit', (code) => {
//   console.log('beforeExit', code)
//   setTimeout(() => {
//     console.log('异步代码', 'beforeExit')
//   }, 1000)
// })
// console.log('代码执行完毕')

// process.exit()




// 标准输入输出

// console.log = function(data) {
//   process.stdout.write('---' + data + '\n')
// }
// console.log(123)
// console.log(456)

// const fs = require('fs')
// fs.createReadStream('test.txt')
//   .pipe(process.stdout)

// process.stdin.pipe(process.stdout)

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk) {
    process.stdout.write('data ' + chunk)
  }
})
