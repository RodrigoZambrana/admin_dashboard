const express = require("express");
const router = express.Router();

const {
  getExpensesByMonth,
  getPaymentsByMonth,
  getOrdersByMonth,
  getPendingByMonth,
  getNewCustomersByMonth,
  getRevenewByMonth,
  getPendingOrders,
  getOrdersPendingPayment,
} = require("../controller/statisticsController");

/*get all category
router.get("/", getAllCategory);

//add a category
router.post("/add", addCategory);

//get a category
router.get("/:id", getCategoryById);

//update a category
router.put("/edit/:id", updateCategory);

//delete a category
router.patch("/delete/:id", deleteCategory);
*/
module.exports = router;
