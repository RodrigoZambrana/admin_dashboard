const express = require("express");
const router = express.Router();

const {
  getAllEntriesByBudgetId,
  addBudgetEntry,
  getBudgetEntryById,
  updateBudgetEntry,
  deleteBudgetEntry,
} = require("../controller/budgetEntryController");

//get all budget entries for a budget
router.get("/:id", getAllEntriesByBudgetId);

//add a budget entry for a budget
router.post("/add", addBudgetEntry);

//get a a budget entry
router.get("/:id", getBudgetEntryById);

//update a a budget entry
router.put("/edit/:id", updateBudgetEntry);

//delete a a budget entry
router.patch("/delete/:id", deleteBudgetEntry);

module.exports = router;
