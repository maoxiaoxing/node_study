const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')


const router = express.Router()

// 用户登录
router.post('/user/login', userValidator.login, userCtrl.login)

// 用户注册
router.post('/user', userValidator.register, userCtrl.register)

// 获取当前用户
router.get('/user', auth,  userCtrl.getCurrentUser)

// 更新当前用户
router.put('/user', auth, userCtrl.updateCurrentUser)

module.exports = router

