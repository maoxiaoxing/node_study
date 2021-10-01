const express = require('express')
const dataStore = require('./data')

const app = express()

app.get('/', (req: any, res: any) => {
  res.json(dataStore.list)
})

app.listen(8080, () => {
  console.log('服务开启')
})
