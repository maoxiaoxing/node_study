const path = require('path')

// console.log(__filename)
// 1 获取路径中的基础名称
// 返回 path 的最后一部分
// 第二个参数表示扩展名，如果没有，则返回完整的文件名称带后缀
// 第二个参数作为后缀时，如果没有在当前路径中被匹配到，那么就会忽略
// 处理目录路径的时候，结尾处有路径分隔符，则会被忽略掉
// console.log(path.basename(__filename))
// console.log(path.basename(__filename, '.js'))
// console.log(path.basename(__filename, '.css'))
// console.log(path.basename(__filename, 'js'))
// console.log(path.basename('/a/b/c'))
// console.log(path.basename('/a/b/c/'))


// 获取路径目录名
// path.dirname 返回路径中的最后一部分的上一层目录所在路径
// console.log(path.dirname(__filename))
// console.log(path.dirname('/a/b'))
// console.log(path.dirname('/a/b/'))



// 获取路径的扩展名
// 返回path 路径中文件名的后缀
// 如果路径中存在多个点，它匹配的是最后一个到结尾的内容
// console.log(path.extname(__filename))
// console.log(path.extname('/a/b'))
// console.log(path.extname('/a/b/index.html.js'))
// console.log(path.extname('/a/b/index.html.'))


// 解析路径
// 接收一个路径 返回一个对象 包含不同的信息
// console.log(path.parse('/a/b/c/index.html'))
// console.log(path.parse('/a/b/c/'))
// console.log(path.parse('./a/b/c/'))


// 序列化路径
// const obj = path.parse('./a/b/c/index.html')
// console.log(path.format(obj))


// 判断当前路径是否为绝对路径
// console.log(path.isAbsolute('foo'))
// console.log(path.isAbsolute('/foo'))
// console.log(path.isAbsolute('///foo'))
// console.log(path.isAbsolute('./foo'))
// console.log(path.isAbsolute(''))
// console.log(path.isAbsolute('.'))
// console.log(path.isAbsolute('../'))


// 拼接路径
// console.log(path.join('a/b', 'c', 'index.html'))
// console.log(path.join('/a/b', 'c', 'index.html'))
// console.log(path.join('a/b', 'c', '../', 'index.html'))
// console.log(path.join('a/b', 'c', './', 'index.html'))
// console.log(path.join('a/b', 'c', '', 'index.html'))
// console.log(path.join(''))
// console.log(path.join('/a/b', '/c', '/index.html'))
// console.log(path.join('/a/b', '///c/', '//index.html'))


// 规范化路径
// console.log(path.normalize('/a/b/c/d'))
// console.log(path.normalize('/a/b\\/c\/d'))
// console.log(path.normalize(''))
// console.log(path.normalize('/a/b\\d/c\/d'))
// console.log(path.normalize('/a/b/\b/c\/d'))


// 绝对路径
// console.log(path.resolve())
// console.log(path.resolve('a', 'b'))
// console.log(path.resolve('a', '/b'))
// console.log(path.resolve('/a', 'b'))
// console.log(path.resolve('/a', '../b'))
// console.log(path.resolve('index.html'))
