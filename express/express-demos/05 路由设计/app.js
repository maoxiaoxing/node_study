const express = require('express')

const app = express()

app.get('/todos', (req, res) => {
  res.send('get todos')
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


