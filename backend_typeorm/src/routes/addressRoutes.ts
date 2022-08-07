import { Router } from 'express'
import {
  getAllSubCategory,
  addSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from '../controller/subCategoryController'

const router = Router()

//get all subCategories
router.get('/', getAllSubCategory)

//add a category
router.post('/add/:id', addSubCategory)

//get a category
router.get('/:id', getSubCategoryById)

//update a category
router.put('/:id', updateSubCategory)

//delete a category
router.patch('/:id', deleteSubCategory)

export default router
