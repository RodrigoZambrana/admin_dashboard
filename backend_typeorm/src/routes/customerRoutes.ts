const express = require("express");
const router = express.Router();

const {
  addCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controller/customerController");

//get all category
router.get("/", getAllCustomer);

//add a category
router.post("/add", addCustomer);

//get a category
router.get("/:id", getCustomerById);

//update a category
router.put("/edit/:id", updateCustomer);

//delete a category
router.patch("/delete/:id", deleteCustomer);

module.exports = router;