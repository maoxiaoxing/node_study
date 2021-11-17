const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

// 创建文章
app.post('/articles', (req, res) => {
  console.log(req.body)
  res.send('post /articles')
})

// 获取文章
app.get('/articles', (req, res) => {
  res.send('get /articles')
})

// 文章详情
app.get('/articles/:id', (req, res) => {
  res.send('get /articles/:id')
})

// 更新文章
app.patch('/articles/:id', (req, res) => {
  res.send('patch /articles/:id')
})

// 删除文章
app.delete('/articles/:id', (req, res) => {
  res.send('delete /articles/:id')
})

app.listen(3000, () => {
  console.log('server is running')
})

