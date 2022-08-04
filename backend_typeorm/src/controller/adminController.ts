import { Request, Response } from "express";
import { signInToken } from "../config/auth";
import { Admin } from "../entity/Admin";

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body.email;
    const admin = await Admin.findOneBy({ email: email });
    if (admin && req.body.password == admin.password) {
      const token = signInToken(admin);
      res.json({
        token,
        id: admin.id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        image: admin.image,
      });
    } else {
      res.status(401).json({
        message: "Invalid Admin or password!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getStaffById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findOneBy({ id: parseInt(id) });
    res.json(admin);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body.email;
    const isAdded = await Admin.findOneBy({ email: email });
    if (isAdded) {
      return res.status(403).json({
        message: "This Email already Added!",
      });
    } else {
      const newStaff = new Admin();
      const staff = await newStaff.save();
      const token = signInToken(staff);
      res.json({
        token,
        id: staff.id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        joiningData: Date.now(),
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getStaffById,
};
