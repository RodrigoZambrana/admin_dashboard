import { Router } from 'express'

import {
  addBudget,
  getAllBudget,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from '../controller/budgetController'

const router = Router()

//get all budgets
router.get('/', getAllBudget)

// router.get('/:id', getAllCustomerBudget)

//add a budget
router.post('/add', addBudget)

//get a budget
router.get('/:id', getBudgetById)

//update a budget
router.put('/:id', updateBudget)

//delete a budget
router.patch('/:id', deleteBudget)

export default router
