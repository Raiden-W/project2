const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guards')

router.get('/', (req, res) => {
  res.render('contents/stories')
})

router.get('/create-story', isLoggedIn, (req, res) => {
  res.render('contents/create-story')
})

module.exports = router
