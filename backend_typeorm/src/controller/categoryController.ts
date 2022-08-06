import { Request, Response } from "express";
import { Category } from "../entity/Category";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import { AppDataSource } from "../db";

const categoryRepository = AppDataSource.getRepository(Category);

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
      message: "Category  Successfully Added!",
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

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const search_category = await categoryRepository.find({
      relations: {
        subCategories: true,
      },
      where: {
        id: id,
      },
    });

    if (search_category != null) {
      res.json(search_category);
    } else {
      res.status(404).send({ message: "Category id not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const search_category = await categoryRepository.find({
      where: {
        id: id,
      },
    });
    if (search_category != null) {
      const { name, image_url, showing } = req.body;
      const category = await Category.update(
        {
          id,
        },
        {
          name: name,
          image_url: image_url,
          showing: showing,
        }
      );
      res.status(200).json({
        message: "Category  Successfully Updated!",
      });
    } else {
      res.status(404).send({ message: "Category not found!" });
    }
  } catch (err) {
    res.status(404).send({ message: "Category not found!" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const category = await categoryRepository.findOneById(id);
    if (category !== null) {
      await categoryRepository.delete({ id });
      res.status(200).send({
        message: "Category Deleted Successfully!",
      });
    } else {
      res.status(404).send({ message: "Category not found!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
