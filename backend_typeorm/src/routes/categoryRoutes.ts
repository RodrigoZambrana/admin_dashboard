const express = require("express");
const router = express.Router();

const {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  updateStatus,
} = require("../controller/categoryController");

//get all category
router.get("/", getAllCategory);

//add a category
router.post("/add", addCategory);

//get a category
router.get("/:id", getCategoryById);

//update a category
router.put("/:id", updateCategory);

//delete a category
router.patch("/:id", deleteCategory);

//show/hide a category
router.put("/status/:id", updateStatus);

module.exports = router;
