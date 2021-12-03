const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

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
    todos.forEach((todo) => {
      str += `<li>${todo.title}</li>`
    })
    const ret = data.replace('^_^', str)
    res.end(ret)
  })
})

app.listen(3000, () => {
  console.log(`server is running http://localhost:3000/`)
})
