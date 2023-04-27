const express = require('express');
const router = express.Router();

//Get signup page
router.get('/signup', (req, res) => { // url browser 
    res.render('auth/signup'); //files
});

// Get login page
router.get('/login', (req, res) => { 
    res.render('auth/login');
});

module.exports = router;


