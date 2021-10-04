// 一、导入
// const obj = require('./m')
// console.log(obj)


// 二、module
// const obj = require('./m')


// 三、exports
// const obj = require('./m')
// console.log(obj)


// 四、同步加载
const obj = require('./m')
// console.log(obj)
// console.log('commjs被加载le')

console.log(require.main === module, 'common.js')

