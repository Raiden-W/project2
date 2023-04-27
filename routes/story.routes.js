const express = require('express');
const router = express.Router();

router.get ('/', (req, res) => {  
    res.render('story/list'); 
});

router.get ('/add', (req, res) => {  
    res.render('story/add'); 
});

module.exports = router;