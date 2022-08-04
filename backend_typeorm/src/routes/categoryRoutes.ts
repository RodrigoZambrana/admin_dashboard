import { Router } from "express";
import {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController";

const router = Router();

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

export default router;
