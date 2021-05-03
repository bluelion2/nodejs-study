const express = require('express')
const User = require('../models/users')
const Comment = require('../models/comments')

const router = express.Router()

router.route('/').get(async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    console.error(error)
    next(error)
  }
}).post(async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
      married: req.body.married
    })
    console.log("create", user)
    res.status(201).json(user)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id}
      }
    })

    console.log('get comment', comment)
    res.json(comments)

  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router