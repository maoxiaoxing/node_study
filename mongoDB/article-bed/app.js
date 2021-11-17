const express = require('express')

const app = express()

console.log(123)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000, () => {
  console.log('server is running')
})

