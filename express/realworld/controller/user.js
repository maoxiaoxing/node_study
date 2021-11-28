const { User } = require('../model')



// 用户登录
exports.login = async (req, res, next) => {
  try {
    // let user = new User(req.body.user)
    // await user.save()

    // user = user.toJSON()

    // delete user.password

    res.status(201).json({
      a: 1,
    })
  } catch (err) {
    next(err)
  }
}

// 用户注册
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body.user)
    await user.save()

    user = user.toJSON()

    delete user.password

    res.status(201).json({
      user,
    })
  } catch (err) {
    next(err)
  }
}

// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    })
  } catch (err) {
    next(err)
  }
}

// 更新当前登录用户
exports.updateCurrentUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send('updateCurrentUser')
  } catch (err) {
    next(err)
  }
}

// 获取指定用户资料
exports.getUserProfile = async (req, res, next) => {
  try {
    // 处理请求
    res.send('getUserProfile')
  } catch (err) {
    next(err)
  }
}

// 关注用户
exports.followUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send('followUser')
  } catch (err) {
    next(err)
  }
}

// 取消关注用户
exports.unfollowUser = async (req, res, next) => {
  try {
    // 处理请求
    res.send('unfollowUser')
  } catch (err) {
    next(err)
  }
}
