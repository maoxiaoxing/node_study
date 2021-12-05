const express = require('express')
const fs = require('fs')
const path = require('path')
const template = require('art-template')


const app = express()

app.engine('art', require('express-art-template'))
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')

app.use('/public', express.static(path.join(__dirname, './public')))

const todos = [
  { id: 1, title: '吃饭' },
  { id: 2, title: '睡觉' },
  { id: 3, title: '打豆豆' },
]

app.get('/', (req, res) => {
  fs.readFile('./views/index.html', 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('404 Not Found')
    }
    let str = ''
    // todos.forEach((todo) => {
    //   str += `<li>${todo.title}</li>`
    // })
    // const ret = data.replace('^_^', str)


    // const ret = template.render(data, { // 模板中使用的数据
    //   foo: 'bar',
    //   todos
    // })
    // res.end(ret)


    res.render('index.art', {
      foo: 'bar',
      todos,
    })
  })
})

app.listen(3000, () => {
  console.log(`server is running http://localhost:3000/`)
})
