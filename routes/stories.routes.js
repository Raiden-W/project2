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
router.get('/:itemId/create-story', isLoggedIn, async (req, res) => {
  const createdBy = req.session.user._id
  const { itemId } = req.params
  const storyExist = await Story.findOne({ itemId, createdBy })
  // console.log('storyExist', storyExist)
  if (!!storyExist) {
    // console.log('You already shared your story about this item !')
    await storyExist.populate('itemId')
    res.redirect(`/profile/#${storyExist.itemId.name}`)
  } else {
    res.render('contents/create-story')
  }
})

router.post('/:itemId/create-story', async (req, res) => {
  try {
    const text = req.body.text
    const createdBy = req.session.user._id
    const { itemId } = req.params

    const newStory = await Story.create({ text, createdBy, itemId })
    const currItem = await NostalgicItem.findById(itemId)
    await NostalgicItem.findByIdAndUpdate(itemId, {
      stories: currItem.stories.concat(newStory._id),
      collectedBy: currItem.collectedBy.concat(createdBy),
    })
    res.redirect('/profile')
  } catch (error) {
    console.log('error in the create story route', error)
  }
})

//edit
router.get('/edit/:storyId', async (req, res) => {
  try {
    const storyToEdit = await Story.findById(req.params.storyId)
    res.render('contents/edit-story', { storyToEdit })
  } catch (error) {
    console.log('error in the editing story route GET', error)
  }
})

router.post('/edit/:storyId', async (req, res) => {
  try {
    const { storyId } = req.params
    await Story.findByIdAndUpdate(storyId, req.body, {
      new: true,
    })
    res.redirect('/profile')
  } catch (error) {
    console.log('error in the editing story route POST', error)
  }
})

//delete
router.get('/delete/:storyId', async (req, res) => {
  // console.log('this is the story id', req.params)
  try {
    const { storyId } = req.params
    const storyDeleted = await Story.findByIdAndDelete(storyId)

    const currItem = await NostalgicItem.findById(storyDeleted.itemId)
    const newCollectedBy = currItem.collectedBy
    newCollectedBy.splice(newCollectedBy.indexOf(storyDeleted.createdBy), 1)
    const newStories = currItem.stories
    newStories.splice(newStories.indexOf(storyDeleted.createdBy), 1)

    await NostalgicItem.findByIdAndUpdate(storyDeleted.itemId, {
      collectedBy: newCollectedBy,
      stories: newStories,
    })
    res.redirect('/profile')
  } catch (error) {
    console.log('error in the deleting story route GET', error)
  }
})

module.exports = router
