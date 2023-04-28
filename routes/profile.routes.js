const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guards')

router.get('/', isLoggedIn, (req, res) => {
  res.render('profile')
})

module.exports = router
