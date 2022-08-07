import { Router } from 'express'

import {
  getAllOrders,
  getOrderById,
  //getOrderByUser,
  updateOrder,
  deleteOrder,
} from '../controller/orderController'

const router = Router()

//get all orders
router.get('/', getAllOrders)

//get all order by a user
// router.get('/user/:id', getOrderByUser)

//get a order by id
router.get('/:id', getOrderById)

//update a order
router.put('/:id', updateOrder)

//delete a order
router.delete('/:id', deleteOrder)

export default router
