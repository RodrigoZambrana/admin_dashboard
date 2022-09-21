import { Router } from "express";
import {
  addCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controller/customerController";

const router = Router();

//get all category
router.get("/", getAllCustomer);

//add a category
router.post("/add", addCustomer);

//get a category
router.get("/:id", getCustomerById);

//update a category
router.put("/:id", updateCustomer);

//delete a category
router.delete("/:id", deleteCustomer);

export default router;
