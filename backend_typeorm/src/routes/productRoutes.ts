import { Router } from "express";
import {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStatus,
} from "../controller/productController";

const router = Router();

//get all products
router.get("/", getAllProduct);

//add a product
router.post("/add", addProduct);

//get a product
router.post("/:id", getProductById);
//update a product
router.put("/:id", updateProduct);

//delete a product
router.patch("/:id", deleteProduct);

//update a product status
router.put("/status/:id", updateStatus);

export default router;
