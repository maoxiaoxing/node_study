const express = require('express')
const fs = require('fs')

const app = express()

app.get('/todos', (req, res) => {
  fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      })
    }

    const db = JSON.parse(data)
    res.status(200).json({
      errno: 200,
      errmsg: 'ok',
      data: {
        data: db.todos,
        total: db.todos.length,
      }
    })
  })
})

app.get('/todos/:id', (req, res) => {
  res.send('get todos/id')
})

app.post('/todos', (req, res) => {
  res.send('post todos')
})

app.patch('/todos/:id', (req, res) => {
  res.send('patch todos')
})

app.delete('/todos', (req, res) => {
  res.send('delete todos')
})

app.listen(3000, () => {
  console.log('server is running')
})


