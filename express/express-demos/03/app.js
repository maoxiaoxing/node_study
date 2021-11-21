const express = require('express')

const app = express()

app.get('/', (req, res) => {
  // res.send('hello world')

  // res.send({
  //   foo: 'bar'
  // })
  res.cookie('foo', 'bar')
  res.cookie('kk', '123')
  res.status(200).send('ok')
})

app.listen(3000, () => {
  console.log('server is running')
})


