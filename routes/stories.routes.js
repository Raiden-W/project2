const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guards')
const Story = require('../models/Story.model')


router.get('/', async (req, res) => {
  let stories = []
  stories = await Story.find()
    .sort({ createdAt: -1 })
    .populate('createdBy', 'username')
    .populate('itemId', 'imgUrl')
  res.render('contents/stories', { stories })
})

router.get('/:itemId/stories', (req, res) => {
  res.render('contents/stories')
})

router.get('/:itemId/create-story', isLoggedIn, (req, res) => {
  res.render('contents/create-story')
})

router.post('/:itemId/create-story', async (req, res) => {
  try {
    const text = req.body.text
    const createdBy = req.session.user._id
    const { itemId } = req.params

    // Check if current user has created an other story
    let isExist = await Story.findOne({ itemId, createdBy })
    console.log("isExist", isExist)
    if (!isExist) {
      await Story.create({ text, createdBy, itemId })
      res.redirect('/profile')
    }
    else {
      console.log('You already shared your story about this item !')
      res.redirect('/nostalgia-lib')
    }

  }
  catch (error) {
    console.log('error in the create story route', error)
  }
})



module.exports = router
