const express = require('express')
const morgan = require('morgan')
const app = express()
const pool = require('./config/database')

const categoryRoutes = require('./routes/categoryRoutes')

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

//Global variables

// Routes
app.use('/categories', require('./routes/categoryRoutes'))

//Public

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})
