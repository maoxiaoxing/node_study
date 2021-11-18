const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const connectUri = 'mongodb://localhost:27017'
const dbClient = new MongoClient(connectUri)

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

// 创建文章
app.post('/articles', async (req, res, next) => {
  try {
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
  } catch (err) {
    // res.status(500).json({
    //   errmsg: err.message
    // })
    next(err)
  }
})

// 获取文章
app.get('/articles', async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query
    const _page = Number.parseInt(page)
    const _pageSize = Number.parseInt(pageSize)
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    const ret = await collection
      .find()
      .skip((_page - 1) * _pageSize) // 跳过 n 条
      .limit(_pageSize) // 拿到 n 条

    const articles = await ret.toArray()
    const total = await collection.countDocuments()
    res.status(200).json({
      articles,
      total,
    })
  } catch(err) {
    next(err)
  }
})

// 文章详情
app.get('/articles/:id', async (req, res, next) => {
  try {
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    const article = await collection.findOne({
      _id: ObjectId(req.params.id)
    })
    res.status(200).json({
      article,
    })
  } catch(err) {
    next(err)
  }
})

// 更新文章
app.post('/articles/update', async (req, res, next) => {
  try {
    const {
      id,
    } = req.body
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    await collection.updateOne({
      _id: ObjectId(id)
    }, {
      $set: req.body.article,
    })
    res.status(200).json({
      errmsg: 'ok'
    })
  } catch(err) {
    next(err)
  }
})

// 删除文章
app.delete('/articles/:id', (req, res) => {
  res.send('delete /articles/:id')
})

// 四个参数缺一不可
app.use((err, req, res, next) => {
  res.status(500).josn({
    errmsg: err.message
  })
})

app.listen(3000, () => {
  console.log('server is running')
})

