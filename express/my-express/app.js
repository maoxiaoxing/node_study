const express = require('./express')

const app = express()

app.get('/', (req, res) => {
  res.end('get /')
})

// app.get('/ab+cd', (req, res) => {
//   res.end('get /')
// })

app.get('/foo', (req, res, next) => {
  console.log('foo 1')
  setTimeout(() => {
    next()
  }, 1000)
})

app.get('/foo', (req, res, next) => {
  console.log('foo 2')
  next()
})

app.get('/foo', (req, res, next) => {
  res.end('get /foo')
})

app.get('/user/:userId/books/:bookId', (req, res) => {
  console.log(req.params)
  res.end('/user/:userId/books/:bookId')
})

app.get('/about', (req, res) => {
  res.end('get /about')
})

app.post('/about', (req, res) => {
  res.end('post /about')
})

app.patch('/about', (req, res) => {
  res.end('patch /about')
})

app.delete('/about', (req, res) => {
  res.end('delete /about')
})

app.listen(3000, () => {
  console.log('http://localhost:3000/')
})

