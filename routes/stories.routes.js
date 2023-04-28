const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guards')

router.get('/', (req, res) => {
  res.render('contents/stories')
})

router.get('/:itemId/stories', (req, res) => {
  console.log(req.params.contentId)
  res.render('contents/stories')
})

router.get('/:itemId/create-story', isLoggedIn, (req, res) => {
  console.log(req.params.contentId)
  res.render('contents/create-story')
})

module.exports = router
