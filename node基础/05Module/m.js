// 一、module 导入与导出
// const age = '18'
// const addFn = (x, y) => x + y

// module.exports = {
//   age,
//   addFn,
// }


// 二、module
// console.log(module)


// 三、exports
// exports.name = 'maoxiaoxing'
// 错误的操作
// exports = {
//   name: 'maoxiaoxoing'
// }


// 四、同步加载
module.exports = 'maoxiaoxing'
// let date = new Date()
// while (new Date() - date < 4000) {}
// console.log('m.js被加载了')

// require.main 指向 module.parent，
console.log(require.main === module, 'm.js')

