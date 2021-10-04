const vm = require('vm')
const fs = require('fs')

// const age = 33
age = 20
const content = fs.readFileSync('code.txt', 'utf-8')

// eval(content)
// console.log(content)
// const fn = new Function('age', 'return age + 1')
// console.log(fn(age))

// vm.runInThisContext(content)
vm.runInThisContext("age += 10")
console.log(age)
