const express = require('express')
const router = express.Router()
const NostalgicItem = require('../models/NostalgicItem.model.js')

/* GET home page */
router.get('/nostalgia-lib',  async (req, res, next) => {
  // const allItems = await NostalgicItem.find()
  const allItems = [
    {
      name: 'Furby',
      imgUrl: [
        'https://i.etsystatic.com/7863475/r/il/1b7911/3843664499/il_570xN.3843664499_36iv.jpg',
      ],
      shortInfo: 'Furby talks Furbish.',
      _id: '1234',
      collectedBy: ['123', '456'],
    },
    {
      name: 'Nokia 3310',
      imgUrl: ['https://spycraft.b-cdn.net/wp-content/uploads/2019/12/products-188-420x420.jpg'],
      shortInfo: 'What an acient Nokia.',
      _id: '4567',
      collectedBy: ['123', '456', '789'],
    },
  ]
  res.render('contents/nostalgia-lib', { allItems })
})

router.get('/create-item', (req, res, next) => {
  res.render('contents/create-item')
})

router.post('/create-item', (req, res, next) => {
  console.log(req.body)
})

module.exports = router
