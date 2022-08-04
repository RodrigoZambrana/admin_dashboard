import { Request, Response } from "express";
import { Category } from "../entity/Category";
import { validate } from "class-validator";
import { createConnection } from "typeorm";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, image_url } = req.body;

    const newCategory = new Category();
    newCategory.name = name;
    newCategory.image_url = image_url;

    const errors = await validate(newCategory);
    if (errors.length > 0) {
      throw new Error(`Validation failed!`);
    } else {
      await newCategory.save();
    }
    res.status(200).json({
      message: "Category Added Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

//categories and subcategories
export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ relations: ["subCategories"] });
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

// export const getCategoryById = async (req: Request, res: Response) => {
//   try {
//     const category = await Category.findOneBy(req.params.id);
//     res.json(category);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const updateCategory = async (req: Request, res: Response) => {
//   try {
//     const category = await Category.findOneBy(req.params.id);
//     if (category) {
//       category.parent = req.body.parent;
//       category.type = req.body.type;
//       category.icon = req.body.icon;
//       category.children = req.body.children;
//       await category.save();
//       res.send({ message: "Category Updated Successfully!" });
//     }
//   } catch (err) {
//     res.status(404).send({ message: "Category not found!" });
//   }
// };

// export const deleteCategory = (req: Request, res: Response) => {
//   Category.deleteOne({ _id: req.params.id }, (error) => {
//     if (error) {
//       res.status(500).send({
//         message: error.message,
//       });
//     } else {
//       res.status(200).send({
//         message: "Category Deleted Successfully!",
//       });
//     }
//   });
// };

module.exports = {
  addCategory,
  getAllCategory,
  // getCategoryById,
  // updateCategory,
  // deleteCategory,
};
