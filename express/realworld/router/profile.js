const express = require('express')
// const userCtrl = require('../controller/user')

const router = express.Router()

// 获取用户资料
router.get('/:username', (req, res) => {
  res.send('post /users/login')
})

// 关注用户
router.post('/:username/follow', (req, res) => {
  res.send('post /users/login')
})

// 取消关注用户
router.delete('/:username/follow', (req, res) => {
  res.send('post /users/login')
})

module.exports = router
