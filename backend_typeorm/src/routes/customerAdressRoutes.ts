const express = require("express");
const router = express.Router();

const {
  getAllCustomerAddress,
  addAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require("../controller/customerAdressController");

//get all customer address
router.get("/:id", getAllCustomerAddress);

//add an address to a customer
router.post("/add/:id", addAddress);

//get an address by adress_id
router.get("/:id", getAddressById);

//update customer address
router.put("/edit/:id", updateAddress);

//delete an address
router.patch("/delete/:id", deleteAddress);

module.exports = router;
