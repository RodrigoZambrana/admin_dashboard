import { Router } from 'express'
import {
  getAllOrder_Entry,
  addOrder_Entry,
  getOrder_EntryById,
  updateOrder_Entry,
  deleteOrder_Entry,
} from '../controller/orderEntryController'

const router = Router()

//get all budget entries for a budget
router.get('/', getAllOrder_Entry)

//add a budget entry for a budget id
router.post('/:id', addOrder_Entry)

//get a a budget entry
router.get('/:id', getOrder_EntryById)

//update a a budget entry
router.put('/edit/:id', updateOrder_Entry)

//delete a a budget entry
router.patch('/:id', deleteOrder_Entry)

export default router
