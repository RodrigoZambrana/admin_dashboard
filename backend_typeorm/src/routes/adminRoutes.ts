import { Router } from "express";

import {
  registerAdmin,
  loginAdmin,
  getStaffById,
  getAllStaff,
  updateStaff,
  deleteStaff,
} from "../controller/adminController";

const router = Router();

//register a staff
router.post("/register", registerAdmin);

//login a admin
router.post("/login", loginAdmin);

//get a staff
router.post("/:id", getStaffById);

//get all staff
router.post("/", getAllStaff);

//update a staff
router.put("/:id", updateStaff);

//delete a staff
router.delete("/:id", deleteStaff);

export default router;
