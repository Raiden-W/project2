const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guards')
const Story = require('../models/Story.model')
const NostalgicItem = require('../models/NostalgicItem.model')

// list last stories
router.get('/', async (req, res) => {
  let stories = []
  stories = await Story.find()
    .sort({ createdAt: -1 })
    .populate('createdBy', 'username')
    .populate('itemId', 'imgUrl')
  res.render('contents/stories', { stories })
})

// create
router.get('/:itemId/create-story', isLoggedIn, (req, res) => {
  res.render('contents/create-story')
})

router.post('/:itemId/create-story', async (req, res) => {
  try {
    const text = req.body.text
    const createdBy = req.session.user._id
    const { itemId } = req.params

    // Check if current user has created an other story
    let storyExist = await Story.findOne({ itemId, createdBy })
    console.log('storyExist', storyExist)
    if (!storyExist) {
      const newStory = await Story.create({ text, createdBy, itemId })
      const currItem = await NostalgicItem.findById(itemId)
      await NostalgicItem.findByIdAndUpdate(itemId, {
        stories: currItem.stories.concat(newStory._id),
        collectedBy: currItem.collectedBy.concat(createdBy),
      })
      res.redirect('/profile')
    } else {
      console.log('You already shared your story about this item !')
      res.redirect('/nostalgia-lib')
    }
  } catch (error) {
    console.log('error in the create story route', error)
  }
})

//edit
router.get('/edit/:storyId', async (req, res) => {
  const storyToEdit = await Story.findById(req.params.storyId)
  res.render('contents/edit-story', { storyToEdit })
})

router.post('/edit/:storyId', async (req, res) => {
  const { storyId } = req.params
  await Story.findByIdAndUpdate(storyId, req.body, {
    new: true,
  })
  res.redirect('/profile')
})

//delete
router.get('/delete/:storyId', async (req, res) => {
  console.log('this is the story id', req.params)
  const { storyId } = req.params

  let storyDeleted = await Story.findByIdAndDelete(storyId)
  console.log(storyDeleted)

  const currItem = await NostalgicItem.findById(storyDeleted.itemId)
  await currItem.stories.pull({ stories: storyDeleted._id })
  await currItem.collectedBy.pull({ collectedBy: storyDeleted.createdBy })
  await currItem.save()

  res.redirect('/profile')
})

module.exports = router
