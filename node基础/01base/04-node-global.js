// 返回正在执行脚本文件的绝对路径
console.log(__filename)

// 返回正在执行脚本所在目录
console.log(__dirname)

console.log(this === global)

// (function () {
//   console.log(this === global)
// })()

function test () {
  console.log(this === global)
}
test()

