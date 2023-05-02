// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)
require('./config/session.config')(app)

// default value for title local
const capitalize = require('./utils/capitalize')
const projectName = 'name-of-project'

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

const itemsRoutes = require('./routes/items.routes.js')
app.use('/', itemsRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

const profileRoutes = require('./routes/profile.routes')
app.use('/profile', profileRoutes)

const storiesRoutes = require('./routes/stories.routes')
app.use('/stories', storiesRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
