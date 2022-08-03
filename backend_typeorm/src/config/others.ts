import { rateLimit } from "express-rate-limit";

//decrease product quantity after a order created
// export const handleProductQuantity = (cart: any[]) => {
//   cart.forEach((p: { _id: any; quantity: number }) => {
//     Product.updateOne(
//       { _id: p._id },
//       {
//         $inc: {
//           quantity: -p.quantity,
//         },
//       },
//       (err: { message: any }) => {
//         if (err) {
//           console.log(err.message);
//         } else {
//           console.log("success");
//         }
//       }
//     );
//   });
// };

//limit email verification and forget password
export const minutes = 30;
const emailVerificationLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 3,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

export const passwordVerificationLimit = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: 3,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

module.exports = {
  // handleProductQuantity,
  emailVerificationLimit,
  passwordVerificationLimit,
};
