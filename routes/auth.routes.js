const express = require('express')
const router = express.Router()
const bcryptjs = require("bcryptjs")
const User = require('../models/User.model')
const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
const { isLoggedOut } = require('../middleware/route-guards')

//Get signup page
router.get('/signup', isLoggedOut, (req, res) => {
    res.render('auth/signup')
})

router.post('/signup', async (req, res) => {
    try {
        const potentialUser = await User.findOne({ username: req.body.username })
        if (!potentialUser) {
            if (req.body.password === req.body.passwordCheck) {

                if (pwdRegex.test(req.body.password)) {
                    const salt = bcryptjs.genSaltSync(10)
                    const password = bcryptjs.hashSync(req.body.password, salt)
                    await User.create({ username: req.body.username, password })
                    res.redirect('/profile')

                }
                else {
                    res.render('auth/signup')
                    console.log("Password not good enough")
                }
            }
            else {
                res.render('auth/signup')
                console.log("Passwords are not matching")
            }
        }
        else {
            res.render('auth/signup')
            console.log('User exists')
        }
    }

    catch (err) { console.log("Error in Signup Route", err) }
})

// Get login page
router.get('/login', isLoggedOut, (req, res) => {
    res.render('auth/login')
})

router.post('/login', async (req, res) => {

    try {
        const existingUser = await User.findOne({ username: req.body.username })
        if (existingUser) {
            if (bcryptjs.compareSync(req.body.password, existingUser.password)) {
                req.session.user = { username: req.body.username, _id: existingUser._id }
                res.redirect('/profile')
            }
            else {
                res.render('auth/login')
                console.log("Username or password incorrect")
            }
        }
        else {
            res.render('auth/login')
        }
    }
    catch (err) { console.log("Error in login route", err) }
})

router.get('/login', isLoggedOut, (req, res) => {
    res.render('auth/signup')
})


router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/auth/login')
})

module.exports = router;


