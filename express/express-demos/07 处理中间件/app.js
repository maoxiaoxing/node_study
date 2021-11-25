const express = require('express')
const fs = require('fs')
const { getDb, saveDb } = require('./db')
const router = require('./router')

const app = express()

// 配置解析表单请求体：application/json
app.use(express.json())
// 配置解析表单请求体：application/x-www-form-urlencoded
app.use(express.urlencoded())


const statusMap = {
  ok: 200,
  serviceErr: 500,
}

const msgMap = new Map([
  [200, '成功'],
  [500, '服务端错误'],
  [404, '没有找到资源'],
  [422, '不合法的参数'],
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

router.get('/todos', async (req, res, next) => {
  try {
    const db = await getDb()
    res.status(200).json(mapStatus(200, db.todos, {length: db.todos.length}))
  } catch (err) {
    next(err)
  }
})

router.get('/todos/:id', async (req, res, next) => {
  try {
    const db = await getDb()
    const todo = db.todos.find((item) => item.id === req.params.id)

    if (!todo) {
      return res.status(404).json(mapStatus(404))
    }

    res.status(200).json(mapStatus(200, todo))
  } catch (err) {
    next(err)
  }
})

router.post('/todos', async (req, res, next) => {
  try {
    const todo = req.body
    console.log(todo)
    if (!todo.title) {
      return res.status(422).json(mapStatus(422, todo))
    }

    const db = await getDb()

    const lastTodo = db.todos[db.todos.length - 1]

    db.todos.push({
      id: lastTodo ? `${Number(lastTodo.id)+1}` : '1',
      title: todo.title,
    })
    await saveDb(db)

    res.status(200).json(mapStatus(200))
  } catch (err) {
    next(err)
  }
})

router.patch('/todos/:id', async (req, res, next) => {
  try {
    const todo = req.body
    if (!todo.title) {
      return res.status(422).json(mapStatus(422, todo))
    }

    const db = await getDb()

    const ret = db.todos.find(item => item.id === req.params.id)
    if (!ret) {
      return res.status(200).json(mapStatus(404))
    }
    Object.assign(ret, todo)
    await saveDb(db)

    res.status(200).json(mapStatus(200))
  } catch (err) {
    next(err)
  }
})

router.delete('/todos/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const db = await getDb()
    const index = db.todos.findIndex((item) => item.id === id)
    if (index < 0) {
      return res.status(200).json(mapStatus(404))
    }

    db.todos.splice(index, 1)
    await saveDb(db)

    res.status(200).json(mapStatus(200))
  } catch (err) {
    next(err)
  }
})

app.use('/mxx', router)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(200).json(mapStatus(500))
})

app.listen(3000, () => {
  console.log('server is running')
})


