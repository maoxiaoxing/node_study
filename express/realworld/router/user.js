const express = require('express')

const router = express.Router()

// 用户登录
router.post('/user/login', (req, res) => {
  res.send('post /users/login')
})

// 用户注册
router.post('/user', (req, res) => {
  console.log(req.body)
  res.send('post /users')
})

// 获取当前用户
router.get('/user', (req, res) => {
  console.log(req.body)
  res.send('get /users')
})

// 更新当前用户
router.put('/user', (req, res) => {
  console.log(req.body)
  res.send('put /users')
})

module.exports = router

