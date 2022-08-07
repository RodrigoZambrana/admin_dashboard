import { Request, Response } from 'express'
import { SubCategory } from '../entity/SubCategory'
import { Category } from '../entity/Category'
import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { AppDataSource } from '../db'

const subCategoryRepository = AppDataSource.getRepository(SubCategory)
const categoryRepository = AppDataSource.getRepository(Category)

export const addSubCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const category = await categoryRepository.findOneById(id)
    if (category !== null) {
      let newSubCategory = new SubCategory()
      newSubCategory = req.body
      const errors = await validate(newSubCategory)
      if (errors.length > 0) {
        throw new Error(`Validation failed!`)
      } else {
        category.subCategories.push(newSubCategory)
        await category.save()
        res.status(200).json({
          message: 'SubCategory  Successfully Added!',
        })
      }
    } else {
      res.status(404).send({ message: 'Category id not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

//categories and products of subcategory
export const getAllSubCategory = async (req: Request, res: Response) => {
  try {
    const subCategories = await subCategoryRepository.find({
      relations: ['products'],
    })
    res.json(subCategories)
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const getSubCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_SubCategory = await subCategoryRepository.find({
      relations: {
        products: true,
      },
      where: {
        id: id,
      },
    })

    if (search_SubCategory != null) {
      res.json(search_SubCategory)
    } else {
      res.status(404).send({ message: 'SubCategory id not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const search_SubCategory = await subCategoryRepository.find({
      where: {
        id: id,
      },
    })
    if (search_SubCategory != null) {
      const { name, image_url } = req.body
      const subCategory = await subCategoryRepository.update(
        {
          id,
        },
        {
          name: name,
          image_url: image_url,
        },
      )
      res.status(200).json({
        message: 'SubCategory  Successfully Updated!',
      })
    } else {
      res.status(404).send({ message: 'SubCategory not found!' })
    }
  } catch (err) {
    res.status(404).send({ message: 'SubCategory not found!' })
  }
}

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const subCategory = await subCategoryRepository.findOneById(id)
    if (subCategory !== null) {
      await subCategoryRepository.delete({ id })
      res.status(200).send({
        message: 'subCategory Deleted Successfully!',
      })
    } else {
      res.status(404).send({ message: 'subCategory not found!' })
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    })
  }
}

module.exports = {
  addSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
}
