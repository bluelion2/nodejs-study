const express  =require('express')
const User = require('../models/users')

const router = express.Router()
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    console.log('get', users)

    res.render('sequelize', { users })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router