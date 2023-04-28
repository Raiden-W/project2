const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guards')

router.get('/:contentId/stories', (req, res) => {
  console.log(req.params.contentId)
  res.render('contents/stories')
})

router.get('/:contentId/create-story', isLoggedIn, (req, res) => {
  console.log(req.params.contentId)
  res.render('contents/create-story')
})


module.exports = router
