const express = require("express");
const router = express.Router();

const {
  getAllExpense,
  addExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controller/expenseController");

//get all category
router.get("/", getAllExpense);

//add a category
router.post("/add", addExpense);

//get a category
router.get("/:id", getExpenseById);

//update a category
router.put("/edit/:id", updateExpense);

//delete a category
router.patch("/delete/:id", deleteExpense);

module.exports = router;
