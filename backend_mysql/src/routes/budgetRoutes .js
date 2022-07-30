const express = require("express");
const router = express.Router();

const {
  addBudget,
  getAllBudget,
  getAllCustomerBudget,
  getBudgetById,
  updateBudget,
  deleteBudget,
} = require("../controller/categoryController");

//get all budgets
router.get("/", getAllBudget);

router.get("/:id", getAllCustomerBudget);

//add a budget
router.post("/add", addBudget);

//get a budget
router.get("/:id", getBudgetById);

//update a budget
router.put("/edit/:id", updateBudget);

//delete a budget
router.patch("/delete/:id", deleteBudget);

module.exports = router;
