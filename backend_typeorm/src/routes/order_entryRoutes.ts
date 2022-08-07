import { Router } from 'express'
import {
  getAllBudget_Entry,
  addBudget_Entry,
  getBudget_EntryById,
  updateBudget_Entry,
  deleteBudget_Entry,
} from '../controller/budgetEntryController'

const router = Router()

//get all budget entries for a budget
router.get('/', getAllBudget_Entry)

//add a budget entry for a budget id
router.post('/add/:id', addBudget_Entry)

//get a a budget entry
router.get('/:id', getBudget_EntryById)

//update a a budget entry
router.put('/edit/:id', updateBudget_Entry)

//delete a a budget entry
router.patch('/:id', deleteBudget_Entry)

export default router
