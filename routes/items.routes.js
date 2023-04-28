const express = require('express')
const router = express.Router()
const NostalgicItem = require('../models/NostalgicItem.model.js')
const User = require('../models/User.model.js')

const uploader = require('../middleware/cloudinary.config.js')

router.get('/nostalgia-lib', async (req, res, next) => {
  try {
    const allItems = await NostalgicItem.find()
    res.render('contents/nostalgia-lib', { allItems })
  } catch (error) {
    console.log(error)
  }
})

router.get('/contents/create-item', (req, res, next) => {
  res.render('contents/create-item')
})

router.post('/contents/create-item', uploader.array('img', 4), async (req, res, next) => {
  try {
    const currUser = await User.findOne({ username: req.session.user.username })
    const newItemToDB = {
      name: req.body.name,
      imgUrl: req.files.map(file => file.path),
      shortInfo: req.body.shortInfo,
      longInfo: req.body.longInfo,
      collectedBy: [],
      createdBy: currUser._id,
      stories: [],
    }
    const newItem = await NostalgicItem.create(newItemToDB)
    res.redirect(`/item/${newItem._id}`)
  } catch (error) {
    console.log(error)
  }
})

router.get('/item/:itemId', async (req, res, next) => {
  try {
    const item = await NostalgicItem.findById(req.params.itemId)
      .populate('collectedBy', 'username')
      .populate('createdBy', 'username')
    if (item.stories.length !== 0) {
      await item.populate('stories')
    }
    console.log(item)
    res.render('contents/item-page', { item })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
