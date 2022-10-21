import { Request, Response } from "express";
import { signInToken } from "../config/auth";
import { Admin } from "../entity/Admin";
import bcrypt from "bcrypt";
import { AppDataSource } from "../db";
import { validate } from "class-validator";

const adminRepository = AppDataSource.getRepository(Admin);

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    console.log("el email es:" + email);
    const admin = await AppDataSource.createQueryBuilder()
      .select("admin")
      .from(Admin, "admin")
      .where("admin.email = :email", { email: email })
      .getOne();
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
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
    const email = req.body.data.email;
    console.log(email);
    const isAdded = await adminRepository.find({
      where: {
        email: email,
      },
    });
    console.log(isAdded);
    if (isAdded.length > 0) {
      return res.status(403).json({
        message: "This Email already Added!",
      });
    } else {
      const saltRounds = 10;
      const newStaff = new Admin();
      const { name, email, password, phone, role, image } = req.body.data;
      newStaff.name = name;
      newStaff.email = email;
      newStaff.password = bcrypt.hashSync(password, saltRounds);
      newStaff.phone = phone;
      newStaff.role = role;
      newStaff.image = image;
      await newStaff.save();
      res.status(200).json({
        message: "User  Successfully Added!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const updateStaff = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const admin = await adminRepository.findOneById(id);
    if (admin) {
      const saltRounds = 10;

      admin.name = req.body.data.name;
      admin.email = req.body.data.email;
      admin.phone = req.body.data.phone;
      admin.role = req.body.data.role;
      admin.image = req.body.data.image;
      const updatedAdmin = await admin.save();
      const token = signInToken(updatedAdmin);
      res.send({
        token,
        id: updatedAdmin.id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
        role: updatedAdmin.role,
        image: updatedAdmin.image,
      });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

export const deleteStaff = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const admin = adminRepository.findOneById(id);

  if (admin !== null) {
    await adminRepository.delete({ id });
    res.status(200).send({
      message: "Admin Deleted Successfully!",
    });
  } else {
    res.status(404).send({ message: "Admin not found!" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getStaffById,
  getAllStaff,
  updateStaff,
  deleteStaff,
};
