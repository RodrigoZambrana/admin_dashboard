import { Admin } from "../entity/Admin";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { Request, Response, NextFunction } from "express";

export const signInToken = (user: Admin) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image: user.image,
    },
    config.server.token.secret,
    {
      expiresIn: "2d",
    }
  );
};

export const tokenForVerify = (user: Admin) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    config.server.token.issuer,
    { expiresIn: "15m" }
  );
};

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, config.server.token.secret, (error, decoded) => {
        if (error) {
          return res.status(404).json({
            message: error,
            error,
          });
        } else {
          res.locals.jwt = decoded;
          next();
        }
      });
    }
  } catch (error) {
    res.status(401).send({
      message: error,
    });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin = await Admin.findOne({});
  if (admin) {
    next();
  } else {
    res.status(401).send({
      message: "User is not Admin",
    });
  }
};

// export const sendEmail = (
//   body: { from: string | undefined; to: string; subject: string; html: string },
//   res: {
//     status: (
//       arg0: number,
//     ) => {
//       (): any
//       new (): any
//       send: { (arg0: { message: string }): void; new (): any }
//     }
//     send: (arg0: { message: any }) => void
//   },
//   message: string,
// ) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.HOST,
//     service: process.env.SERVICE, //comment this line if you use custom server/domain
//     port: process.env.EMAIL_PORT,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },

//     //comment out this one if you usi custom server/domain
//     // tls: {
//     //   rejectUnauthorized: false,
//     // },
//   })

//   transporter.verify(function (err: { message: any }, success: any) {
//     if (err) {
//       res.status(403).send({
//         message: `Error happen when verify ${err.message}`,
//       })
//       console.log(err.message)
//     } else {
//       console.log('Server is ready to take our messages')
//     }
//   })

//   transporter.sendMail(body, (err: { message: any }, data: any) => {
//     if (err) {
//       res.status(403).send({
//         message: `Error happen when sending email ${err.message}`,
//       })
//     } else {
//       res.send({
//         message: message,
//       })
//     }
//   })
// }

module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
  // sendEmail,
};
