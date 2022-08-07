import { Router } from 'express'
import {
  getAllAddress,
  addAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
} from '../controller/addressController'

const router = Router()

//get all subCategories
router.get('/', getAllAddress)

//add a category
router.post('/:id', addAddress)

//get a category
router.get('/:id', getAddressById)

//update a category
router.put('/:id', updateAddress)

//delete a category
router.patch('/:id', deleteAddress)

export default router
