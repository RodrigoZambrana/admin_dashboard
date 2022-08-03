import { Request, Response } from "express";
import { default as bcrypt } from "bcryptjs";
import { default as dayjs } from "dayjs";
import { default as utc } from "dayjs/plugin/utc";
import jwt from "jsonwebtoken";
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
    res.send(admin);
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

// export const forgetPassword = async (req: Request, res: Response) => {
//   const isAdded = await Admin.findOneBy({ email: req.body.verifyEmail })
//   if (!isAdded) {
//     return res.status(404).send({
//       message: 'Admin/Staff Not found with this email!',
//     })
//   } else {
//     const token = tokenForVerify(isAdded)
//     const body = {
//       from: process.env.EMAIL_USER,
//       to: `${req.body.verifyEmail}`,
//       subject: 'Password Reset',
//       html: `<h2>Hello ${req.body.verifyEmail}</h2>
//       <p>A request has been received to change the password for your <strong>Dashtar</strong> account </p>

//         <p>This link will expire in <strong> 15 minute</strong>.</p>

//         <p style="margin-bottom:20px;">Click this link for reset your password</p>

//         <a href=${process.env.ADMIN_URL}/reset-password/${token}  style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password </a>

//         <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@dashtar.com</p>

//         <p style="margin-bottom:0px;">Thank you</p>
//         <strong>Dashtar Team</strong>
//              `,
//     }
//     const message = 'Please check your email to reset password!'
//     sendEmail(body, res, message)
//   }
// }

// export const resetPassword = async (req: Request, res: Response) => {
//   const token = req.body.token
//   const { email } = jwt.decode(token)
//   const staff = await Admin.findOne({ email })

//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
//       if (err) {
//         return res.status(500).send({
//           message: 'Token expired, please try again!',
//         })
//       } else {
//         staff.password = bcrypt.hashSync(req.body.newPassword)
//         staff.save()
//         res.send({
//           message: 'Your password change successful, you can login now!',
//         })
//       }
//     })
//   }
// }

// export const addStaff = async (req: Request, res: Response) => {
//   try {
//     const isAdded = await Admin.find({ email: req.body.data.email })
//     if (isAdded) {
//       return res.status(500).send({
//         message: 'This Email already Added!',
//       })
//     } else {
//       const newStaff = new Admin()
//       await newStaff.save()
//       res.status(200).send({
//         message: 'Staff Added Successfully!',
//       })
//     }
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     })
//   }
// }

// export const getAllStaff = async (req: Request, res: Response) => {
//   try {
//     const admins = await Admin.find()
//     res.send(admins)
//   } catch (err) {
//     res.status(500).send({ message: err.message })
//   }
// }

// export const updateStaff = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body.email
//     const admin = await Admin.findOneBy(email)
//     if (admin) {
//       admin.name = req.body.data.name
//       admin.email = req.body.data.email
//       admin.phone = req.body.data.phone
//       admin.role = req.body.data.role
//       admin.joining_data = dayjs().utc().format(req.body.data.joining_data)
//       admin.password = req.body.data.password
//         ? bcrypt.hashSync(req.body.data.password)
//         : admin.password
//       admin.image = req.body.data.image
//       const updatedAdmin = await admin.save()
//       const token = signInToken(updatedAdmin)
//       res.send({
//         token,
//         id: updatedAdmin.id,
//         name: updatedAdmin.name,
//         email: updatedAdmin.email,
//         role: updatedAdmin.role,
//         image: updatedAdmin.image,
//         joiningData: updatedAdmin.joiningData,
//       })
//     }
//   } catch (err) {
//     res.status(404).send(err.message)
//   }
// }

// export const deleteStaff = (req: Request, res: Response) => {
//   const { id } = req.params
//   try {
//     const result = await Admin.delete({ id: parseInt(id) })

//     if (result.affected === 0)
//       return res.status(404).json({ message: 'User not found' })

//     return res.sendStatus(204)
//   } catch (error) {
//     if (error instanceof Error) {
//       return res.status(500).json({ message: error.message })
//     }
//   }
// }

module.exports = {
  registerAdmin,
  loginAdmin,
  // forgetPassword,
  // resetPassword,
  // addStaff,
  // getAllStaff,
  getStaffById,
  // updateStaff,
  // deleteStaff,
};
