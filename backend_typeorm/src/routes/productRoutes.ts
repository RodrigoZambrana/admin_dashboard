import { Router } from 'express'
import {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controller/productController'

const router = Router()

//get all products
router.get('/', getAllProduct)

//add a product
router.post('/add/:id', addProduct)

//get a product
router.get('/:id', getProductById)
//update a product
router.put('/:id', updateProduct)

//delete a product
router.patch('/:id', deleteProduct)

export default router
