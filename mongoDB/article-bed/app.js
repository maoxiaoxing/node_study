const express = require('express')
const { MongoClient, Collection } = require('mongodb')

const connectUri = 'mongodb://localhost:27017'
const dbClient = new MongoClient(connectUri)

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

// 创建文章
app.post('/articles', async (req, res) => {
  const {
    article,
  } = req.body

  if (!article || !article.title || !article.description || !article.body) {
    return res.status(422).json({
      errmsg: '请求参数不符合规则要求'
    })
  }

  await dbClient.connect()
  const collection = dbClient.db('test').collection('articles')

  article.createdAt = new Date()
  article.updateAt = new Date()
  const ret = await collection.insertOne(article)

  article._id = ret.insertedId

  res.status(201).json({
    article,
  })
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

