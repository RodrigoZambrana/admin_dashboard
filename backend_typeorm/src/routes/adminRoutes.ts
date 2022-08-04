import { Router } from "express";

import {
  registerAdmin,
  loginAdmin,
  getStaffById,
} from "../controller/adminController";

const router = Router();

//register a staff
router.post("/register", registerAdmin);

//login a admin
router.post("/login", loginAdmin);

//get a staff
router.post("/:id", getStaffById);

export default router;
