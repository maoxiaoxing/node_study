const express = require('express')
const fs = require('fs')

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

app.get('/todos', (req, res) => {
  fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      })
    }

    const db = JSON.parse(data)
    res.status(200).json(mapStatus(200, db.todos, {length: db.todos.length}))
  })
})

app.get('/todos/:id', (req, res) => {
  fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      })
    }

    const db = JSON.parse(data)
    const todo = db.todos.find((item) => item.id === req.params.id)

    if (!todo) {
      return res.status(404).json(mapStatus(404))
    }

    res.status(200).json(mapStatus(200, todo))
  })

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


