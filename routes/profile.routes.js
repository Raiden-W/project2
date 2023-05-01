const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guards')
const Story = require('../models/Story.model')
const Profile = require('../models/Profile.model')

const { uploader, destroyer } = require('../middleware/cloudinary.config.js')

router.get('/', isLoggedIn, async (req, res) => {
  //stories
  let stories = []
  stories = await Story.find({ createdBy: req.session.user._id })
    .sort({ createdAt: -1 })
    .populate('itemId', 'imgUrl')

  let profile = await Profile.findOne({ createdBy: req.session.user._id })
  if (!profile) {
    profile = await Profile.create({ createdBy: req.session.user._id })
  }
  console.log(profile)
  res.render('profile', { stories, profile, username: req.session.user.username })
})

router.get('/edit', isLoggedIn, async (req, res) => {
  profile = await Profile.findOne({ createdBy: req.session.user._id })
  res.render('edit-profile', profile)
})

router.post('/edit', uploader.single('pic'), async (req, res) => {
  const currProfile = await Profile.findOne({ createdBy: req.session.user._id })
  if (!!currProfile.oldPicFilename && !!req.file) {
    await destroyer(currProfile.oldPicFilename)
  }
  await Profile.findOneAndUpdate(
    { createdBy: req.session.user._id },
    {
      picUrl: req.file ? req.file.path : currProfile.picUrl,
      oldPicFilename: req.file ? req.file.filename : currProfile.oldPicFilename,
      birth: req.body.birth,
      intro: req.body.intro,
    }
  )
  res.redirect('/profile')
})

module.exports = router
