const express = require('express')
const fs = require('fs')
const { getDb } = require('./db')

const app = express()

const statusMap = {
  ok: 200,
  serviceErr: 500,
}

const msgMap = new Map([
  [200, '成功'],
  [500, '服务端错误'],
  [404, '没有找到资源'],
])

const mapStatus = (code, data, restObj) => {
  return {
    errno: code,
    errmsg: msgMap.get(code),
    data: {
      data,
      ...restObj
    }
  }
}

app.get('/todos', async (req, res) => {
  try {
    const db = await getDb()
    res.status(200).json(mapStatus(200, db.todos, {length: db.todos.length}))
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

app.get('/todos/:id', async (req, res) => {
  try {
    const db = await getDb()
    const todo = db.todos.find((item) => item.id === req.params.id)

    if (!todo) {
      return res.status(404).json(mapStatus(404))
    }

    res.status(200).json(mapStatus(200, todo))
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
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


