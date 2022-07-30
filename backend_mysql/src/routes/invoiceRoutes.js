const express = require("express");
const router = express.Router();

const {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

//get all invoice
router.get("/", getAllCategory);

//add a invoice
router.post("/add", addCategory);

//get all invoices from a client
router.post("/add", addCategory);

//get an invoice
router.get("/:id", getCategoryById);

//update an invoice
router.put("/edit/:id", updateCategory);

//delete an invoice
router.patch("/delete/:id", deleteCategory);

module.exports = router;
