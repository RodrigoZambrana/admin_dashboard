const express = require('express')
const router = express.Router()

const {
  getAllSubCategory,
  addSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require('../controller/subCategoryController')

//get all subCategories
router.get('/', getAllSubCategory)

//add a category
router.post('/add', addSubCategory)

//get a category
router.get('/:id', getSubCategoryById)

//update a category
router.put('/:id', updateSubCategory)

//delete a category
router.patch('/:id', deleteSubCategory)

module.exports = router
