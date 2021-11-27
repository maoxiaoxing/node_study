const express = require('express')

const router = express.Router()

router.use(require('./user'))
router.use('/profiles', require('./profile'))


module.exports = router

