const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/route-guards');


router.get ('/', (req, res) => {  
    res.render('item/storyLibrary'); 
});

router.get ('/add', isLoggedIn, (req, res) => {  
    res.render('item/addStory'); 
});

module.exports = router;