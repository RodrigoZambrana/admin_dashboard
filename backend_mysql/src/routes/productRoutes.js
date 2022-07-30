const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getShowingProducts,
  getDiscountedProducts,
  getStockOutProducts,
  getProductById,
  getProductBySlug,
  addProduct,
  updateProduct,
  updateStatus,
  deleteProduct,
} = require('../controller/productController')

//get all products
router.get('/', getAllProducts)

//add a product
router.post('/add', addProduct)

//get a product
router.post('/product/:id', getProductById)
//update a product
router.post('/edit/:id', updateProduct)

//update a product status
router.put('/status/:id', updateStatus)

//delete a product
router.delete('/:id', deleteProduct)

//get showing products only
router.get('/show', getShowingProducts)

//get discounted products only
router.get('/discount', getDiscountedProducts)

//get all stock out products
router.get('/stock-out', getStockOutProducts)

//get a product by slug
router.get('/:slug', getProductBySlug)

module.exports = router
