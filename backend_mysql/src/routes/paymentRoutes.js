const express = require("express");
const router = express.Router();

const {
  getAllPayment,
  addPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controller/paymentController");

//get all payments
router.get("/", getAllPayment);

//add a payment
router.post("/add", addPayment);

//get a payment
router.get("/:id", getPaymentById);

//update a payment
router.put("/edit/:id", updatePayment);

//delete a payment
router.patch("/delete/:id", deletePayment);

module.exports = router;
