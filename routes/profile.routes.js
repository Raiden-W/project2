const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guards')
const Story = require('../models/Story.model')

router.get('/', isLoggedIn, async (req, res) => {
  //stories
  let stories = []
  stories = await Story.find({ createdBy: req.session.user._id })
    .sort({ createdAt: -1 })
    .populate('createdBy', 'username')
    .populate('itemId', 'imgUrl')
  res.render('profile', { stories })
})




module.exports = router
