import { Router } from "express";
import {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController";

const router = Router();

//get all products
router.get("/", getAllProduct);

//add a product
router.post("/add", addProduct);

//get a product
router.post("/product/:id", getProductById);
//update a product
router.post("/edit/:id", updateProduct);

//delete a product
router.delete("/:id", deleteProduct);

export default router;
