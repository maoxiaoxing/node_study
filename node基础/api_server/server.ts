const express = require('express')

const app = express()

app.get('/', (req: any, res: any) => {
  res.end('333')
})

app.listen(8080, () => {
  console.log('服务开启')
})
