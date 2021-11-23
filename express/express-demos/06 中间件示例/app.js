const express = require('express')

const app = express()

const myLogger = (req, res, next) => {
  console.log(req.method, req.url, Date.now())
  next()
}
app.use(myLogger)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/about', (req, res) => {
  res.send('get /about')
})

app.post('/login', (req, res) => {
  res.send('get /login')
})

app.listen(3000, () => {
  console.log('server is running')
})


