const express = require('express')
const morgan = require('morgan')
const app = express()
const pool = require('./config/database')

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

//Global variables

// Routes
app.use('/categories', require('./routes/categoryRoutes'))
app.use('/subcategories', require('./routes/subCategoryRoutes'))
app.use('/products', require('./routes/productRoutes'))

//Public

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})
