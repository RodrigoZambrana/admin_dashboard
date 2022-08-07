import { Router } from 'express'
import {
  getAllAddress,
  addAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
} from '../controller/addressController'

const router = Router()

//get all customer address
router.get('/', getAllAddress)

//get all customer address
router.get('/:id', getAllAddress)

//add an address to a customer
router.post('/add/:id', addAddress)

//get an address by adress_id
router.get('/:id', getAddressById)

//update customer address
router.put('/edit/:id', updateAddress)

//delete an address
router.patch('/delete/:id', deleteAddress)

export default router
