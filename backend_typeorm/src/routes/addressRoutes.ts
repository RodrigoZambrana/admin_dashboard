import { Router } from 'express'
import {
  getAllAddress,
  addAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  getAddressByCustomerId,
} from '../controller/addressController'

const router = Router()

//get all subCategories
router.get('/', getAllAddress)

//add a category
router.post('/:id', addAddress)

//get an address for a client
router.get('/customer/:id', getAddressByCustomerId)

//get a category
router.get('/:id', getAddressById)

//update a category
router.put('/:id', updateAddress)

//delete a category
router.patch('/:id', deleteAddress)

export default router
